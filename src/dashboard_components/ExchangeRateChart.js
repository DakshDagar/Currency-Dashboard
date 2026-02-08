import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SUPPORTED_CURRENCIES = ['CAD', 'USD', 'EUR'];

const currencyColorScheme = {
  USD: { border: 'rgb(102, 126, 234)', background: 'rgba(102, 126, 234, 0.1)' },
  EUR: { border: 'rgb(118, 75, 162)', background: 'rgba(118, 75, 162, 0.1)' },
  CAD: { border: 'rgb(237, 100, 166)', background: 'rgba(237, 100, 166, 0.1)' },
};

const ExchangeRateChart = () => {
  const [exchangeRateChartData, setExchangeRateChartData] = useState(null);
  const [isLoadingChartData, setIsLoadingChartData] = useState(true);
  const [activeCurrencies, setActiveCurrencies] = useState(SUPPORTED_CURRENCIES);

  useEffect(() => {
    const savedCurrencies = localStorage.getItem('selectedCurrencies');
    if (savedCurrencies) {
      try {
        const parsedCurrencies = JSON.parse(savedCurrencies);
        const validCurrencies = Array.isArray(parsedCurrencies) ? parsedCurrencies.filter(currency => SUPPORTED_CURRENCIES.includes(currency)) : null;
        if (validCurrencies && validCurrencies.length > 0) setActiveCurrencies(validCurrencies);
      } catch (error) {}
    }
  }, []);

  useEffect(() => {
    setIsLoadingChartData(true);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 730);
    const startDateString = startDate.toISOString().slice(0, 10);
    const endDateString = endDate.toISOString().slice(0, 10);

    fetch(`http://127.0.0.1:8000/api/exchange_rates/?start_date=${startDateString}&end_date=${endDateString}&currencies=CAD,USD,EUR`)
      .then(response => response.json())
      .then(exchangeRateData => {
        // exchangeRateData: array of {date, base_currency, target_currency, rate}
        const uniqueDates = Array.from(new Set(exchangeRateData.map(record => record.date))).sort();

        // build map: currency -> date -> rates[] (use rows where base == currency)
        const currencyDateMap = {};
        SUPPORTED_CURRENCIES.forEach(currency => (currencyDateMap[currency] = {}));

        exchangeRateData.forEach(record => {
          const { date, base_currency, target_currency, rate } = record;
          if (!SUPPORTED_CURRENCIES.includes(base_currency) || !SUPPORTED_CURRENCIES.includes(target_currency)) return;
          if (!currencyDateMap[base_currency][date]) currencyDateMap[base_currency][date] = [];
          currencyDateMap[base_currency][date].push(Number(rate));
        });

        const currenciesToDisplay = activeCurrencies.includes('ALL') ? SUPPORTED_CURRENCIES : activeCurrencies;

        const chartDatasets = currenciesToDisplay.map(currency => {
          const averageRates = uniqueDates.map(date => {
            const ratesForDate = currencyDateMap[currency][date];
            if (!ratesForDate || ratesForDate.length === 0) return null;
            const averageRate = ratesForDate.reduce((sum, rate) => sum + rate, 0) / ratesForDate.length;
            return Number(averageRate.toFixed(6));
          });

          return {
            label: `${currency} Exchange Rate`,
            data: averageRates,
            fill: false,
            backgroundColor: currencyColorScheme[currency].background,
            borderColor: currencyColorScheme[currency].border,
            borderWidth: 3,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: currencyColorScheme[currency].border,
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2,
          };
        });

        setExchangeRateChartData({ labels: uniqueDates, datasets: chartDatasets });
        setIsLoadingChartData(false);
      })
      .catch(error => {
        console.error('Failed to fetch chart data', error);
        setIsLoadingChartData(false);
      });
  }, [activeCurrencies]);

  const toggleCurrencySelection = selectedCurrency => {
    if (selectedCurrency === 'ALL') {
      setActiveCurrencies(SUPPORTED_CURRENCIES);
      localStorage.setItem('selectedCurrencies', JSON.stringify(SUPPORTED_CURRENCIES));
      return;
    }

    setActiveCurrencies(previousCurrencies => {
      const isAlreadySelected = previousCurrencies.includes(selectedCurrency);
      if (isAlreadySelected && previousCurrencies.length === 1) return previousCurrencies;
      let updatedCurrencies = isAlreadySelected 
        ? previousCurrencies.filter(currency => currency !== selectedCurrency) 
        : [...previousCurrencies, selectedCurrency];
      localStorage.setItem('selectedCurrencies', JSON.stringify(updatedCurrencies));
      return updatedCurrencies;
    });
  };

  const chartConfiguration = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { 
          color: '#ffffff',
          font: {
            size: 13,
            weight: '600'
          },
          padding: 15
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 20, 40, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: { 
        ticks: { 
          color: '#a0a0b0',
          maxTicksLimit: 15
        },
        grid: {
          color: 'rgba(102, 126, 234, 0.1)'
        }
      },
      y: { 
        ticks: { 
          color: '#a0a0b0'
        },
        grid: {
          color: 'rgba(102, 126, 234, 0.1)'
        }
      },
    },
  };

  return (
    <div className="chart-container">
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 10, fontWeight: 600, color: '#ffffff' }}>Select Currencies:</label>
        <div className="currency-buttons">
          <button
            type="button"
            className={`currency-button ${SUPPORTED_CURRENCIES.every(currency => activeCurrencies.includes(currency)) ? 'active' : ''}`}
            onClick={() => toggleCurrencySelection('ALL')}
          >
            ALL
          </button>
          {SUPPORTED_CURRENCIES.map(currency => (
            <button
              key={currency}
              type="button"
              className={`currency-button ${activeCurrencies.includes(currency) ? 'active' : ''}`}
              onClick={() => toggleCurrencySelection(currency)}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-canvas">
        {isLoadingChartData && <div style={{ color: '#fff' }}>Loading chart data...</div>}
        {!isLoadingChartData && exchangeRateChartData && <Line data={exchangeRateChartData} options={chartConfiguration} />}
      </div>
    </div>
  );
};

export default ExchangeRateChart;
