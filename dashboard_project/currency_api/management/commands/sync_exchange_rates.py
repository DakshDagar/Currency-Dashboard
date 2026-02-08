from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date
from datetime import date, timedelta
from currency_api.views import SUPPORTED_CURRENCIES
from currency_api.models import ExchangeRate
import requests
from django.db import transaction


class Command(BaseCommand):
    help = 'Fetch 2 years (730 days) of exchange rates from Frankfurter and save to DB (for supported currencies)'

    def handle(self, *args, **options):
        currentDate = date.today()
        fetchEndDate = currentDate - timedelta(days=1)  # Yesterday (most recent complete day)
        fetchStartDate = fetchEndDate - timedelta(days=730)  # 730 days ago (2 years)

        newRecordsCount = 0
        with transaction.atomic():
            for baseCurrency in SUPPORTED_CURRENCIES:
                targetCurrencies = [currency for currency in SUPPORTED_CURRENCIES if currency != baseCurrency]
                targetCurrenciesParam = ','.join(targetCurrencies)
                apiUrl = f'https://api.frankfurter.app/{fetchStartDate.isoformat()}..{fetchEndDate.isoformat()}?from={baseCurrency}&to={targetCurrenciesParam}'
                try:
                    apiResponse = requests.get(apiUrl, timeout=20)
                    apiResponse.raise_for_status()
                    apiData = apiResponse.json()
                except Exception as error:
                    self.stdout.write(self.style.WARNING(f'Failed to fetch for {baseCurrency}: {error}'))
                    continue

                for dateString, exchangeRates in apiData.get('rates', {}).items():
                    parsedDate = parse_date(dateString)
                    for targetCurrency, exchangeRate in exchangeRates.items():
                        exchangeRateObject, isNewRecord = ExchangeRate.objects.update_or_create(
                            date=parsedDate,
                            base_currency=baseCurrency,
                            target_currency=targetCurrency,
                            defaults={'rate': float(exchangeRate)}
                        )
                        if isNewRecord:
                            newRecordsCount += 1
                        if exchangeRate and float(exchangeRate) != 0:
                            reverseExchangeRate = 1.0 / float(exchangeRate)
                            ExchangeRate.objects.update_or_create(
                                date=parsedDate,
                                base_currency=targetCurrency,
                                target_currency=baseCurrency,
                                defaults={'rate': reverseExchangeRate}
                            )

        self.stdout.write(self.style.SUCCESS(f'Synced {newRecordsCount} new rates for {fetchStartDate}..{fetchEndDate}'))
