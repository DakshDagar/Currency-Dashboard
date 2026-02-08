import requests
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.dateparse import parse_date
from django.db import transaction
from django.shortcuts import render
from datetime import datetime, timedelta
from .models import ExchangeRate
from .serializers import ExchangeRateSerializer


# Allowed currencies for this dashboard
SUPPORTED_CURRENCIES = ['CAD', 'USD', 'EUR']


class ExchangeRateViewSet(viewsets.ModelViewSet):
    queryset = ExchangeRate.objects.all().order_by('date')
    serializer_class = ExchangeRateSerializer

    def list(self, request, *args, **kwargs):
        """Return exchange rates filtered by date range and currencies.

        Query params:
        - start_date (YYYY-MM-DD)
        - end_date (YYYY-MM-DD)
        - currencies (comma separated list of 3-letter codes) - optional
        """
        queryset = self.queryset
        startDateParam = request.query_params.get('start_date')
        endDateParam = request.query_params.get('end_date')
        currenciesParam = request.query_params.get('currencies')

        if startDateParam:
            try:
                parsedStartDate = parse_date(startDateParam)
                queryset = queryset.filter(date__gte=parsedStartDate)
            except Exception:
                pass
        if endDateParam:
            try:
                parsedEndDate = parse_date(endDateParam)
                queryset = queryset.filter(date__lte=parsedEndDate)
            except Exception:
                pass

        if currenciesParam:
            filteredCurrencies = [currency.strip().upper() for currency in currenciesParam.split(',') if currency.strip()]
            filteredCurrencies = [currency for currency in filteredCurrencies if currency in SUPPORTED_CURRENCIES]
            if filteredCurrencies:
                queryset = queryset.filter(base_currency__in=filteredCurrencies, target_currency__in=filteredCurrencies)
        else:
            # default to allowed currencies only
            queryset = queryset.filter(base_currency__in=SUPPORTED_CURRENCIES, target_currency__in=SUPPORTED_CURRENCIES)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def sync(self, request):
        """Fetch historical rates from Frankfurter and save to the DB.

        POST body params:
        - start_date (YYYY-MM-DD)
        - end_date (YYYY-MM-DD)
        - max_days (optional) limit to N days (max 730)
        """
        startDateParam = request.data.get('start_date')
        endDateParam = request.data.get('end_date')
        maxDaysLimit = int(request.data.get('max_days', 730))
        if maxDaysLimit > 730:
            maxDaysLimit = 730

        if endDateParam:
            calculatedEndDate = parse_date(endDateParam)
        else:
            calculatedEndDate = datetime.utcnow().date()

        if startDateParam:
            calculatedStartDate = parse_date(startDateParam)
        else:
            calculatedStartDate = calculatedEndDate - timedelta(days=maxDaysLimit)

        if not calculatedStartDate or not calculatedEndDate:
            return Response({'error': 'Invalid dates'}, status=400)

        # Ensure range is not more than 730 days
        if (calculatedEndDate - calculatedStartDate).days > 730:
            calculatedStartDate = calculatedEndDate - timedelta(days=730)

        newRecordsCount = 0
        # For each base currency, fetch rates to the other allowed currencies
        with transaction.atomic():
            for baseCurrency in SUPPORTED_CURRENCIES:
                targetCurrencies = [currency for currency in SUPPORTED_CURRENCIES if currency != baseCurrency]
                targetCurrenciesParam = ','.join(targetCurrencies)
                apiUrl = f'https://api.frankfurter.app/{calculatedStartDate.isoformat()}..{calculatedEndDate.isoformat()}?from={baseCurrency}&to={targetCurrenciesParam}'
                try:
                    apiResponse = requests.get(apiUrl, timeout=20)
                    apiResponse.raise_for_status()
                    apiData = apiResponse.json()
                except Exception as error:
                    continue

                # apiData.rates is a dict date -> {CUR: rate}
                for dateString, exchangeRates in apiData.get('rates', {}).items():
                    try:
                        parsedDate = parse_date(dateString)
                    except Exception:
                        continue
                    for targetCurrency, exchangeRate in exchangeRates.items():
                        # save forward rate
                        exchangeRateObject, isNewRecord = ExchangeRate.objects.update_or_create(
                            date=parsedDate,
                            base_currency=baseCurrency,
                            target_currency=targetCurrency,
                            defaults={'rate': float(exchangeRate)}
                        )
                        if isNewRecord:
                            newRecordsCount += 1
                        # save reverse rate (reciprocal)
                        if exchangeRate and float(exchangeRate) != 0:
                            reverseExchangeRate = 1.0 / float(exchangeRate)
                            ExchangeRate.objects.update_or_create(
                                date=parsedDate,
                                base_currency=targetCurrency,
                                target_currency=baseCurrency,
                                defaults={'rate': reverseExchangeRate}
                            )

        return Response({'status': 'synced', 'saved': newRecordsCount, 'start_date': calculatedStartDate, 'end_date': calculatedEndDate})