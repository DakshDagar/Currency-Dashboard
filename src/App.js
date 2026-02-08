import React from 'react';
import ExchangeRateTable from './dashboard_components/ExchangeRateTable';
import ExchangeRateChart from './dashboard_components/ExchangeRateChart';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="app-header">
                <div className="header-content">
                    <div className="header-left">
                        <img src="https://cdn.prod.website-files.com/5fc32406234e05d5530ee6c1/67ae5b4a4df649055d0c02a9_HAI-022025-047_fff.png" alt="Logo" className="logo" style={{ height: '45px' }} />
                        <div className="header-text">
                            <h1 className="main-title">Currency Dashboard</h1>
                            <p className="subtitle">Take Home Assignment by Daksh Dagar</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="content-wrapper">
                    <div className="table-section">
                        <div className="section-header">
                            <h2>Exchange Rates Table</h2>
                            <p className="section-subtitle">Complete list of all exchange rates</p>
                        </div>
                        <ExchangeRateTable />
                    </div>

                    <div className="chart-section">
                        <div className="section-header">
                            <h2>Exchange Rate Trends</h2>
                            <p className="section-subtitle">Visualize currency movements over time</p>
                        </div>
                        <ExchangeRateChart />
                    </div>
                </div>
            </main>

            <div className="dynamic-background">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default App;