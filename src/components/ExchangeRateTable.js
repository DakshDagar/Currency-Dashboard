import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ExchangeRateTable = () => {
    const [exchangeRateRecords, setExchangeRateRecords] = useState([]);
    const [savedColumnConfiguration, setSavedColumnConfiguration] = useState(null);

    useEffect(() => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 730);
        const startDateString = startDate.toISOString().slice(0,10);
        const endDateString = endDate.toISOString().slice(0,10);

        fetch(`/api/exchange_rates/?start_date=${startDateString}&end_date=${endDateString}&currencies=CAD,USD,EUR`)
            .then(response => response.json())
            .then(apiData => {
                setExchangeRateRecords(apiData);
            });

        const savedColumnState = localStorage.getItem('columnState');
        if (savedColumnState) {
            setSavedColumnConfiguration(JSON.parse(savedColumnState));
        }
    }, []);

    const tableColumnDefinitions = [
        { headerName: 'ID', field: 'id', flex: 0.5, minWidth: 60, filter: true, sortable: true },
        { headerName: 'Date', field: 'date', flex: 1.2, minWidth: 140, filter: true, sortable: true },
        { headerName: 'Base Currency', field: 'base_currency', flex: 1, minWidth: 120, filter: true, sortable: true },
        { headerName: 'Target Currency', field: 'target_currency', flex: 1, minWidth: 120, filter: true, sortable: true },
        { headerName: 'Exchange Rate', field: 'rate', flex: 1.2, minWidth: 140, filter: true, sortable: true },
    ];

    const handleGridInitialization = gridParams => {
        // Restore column state, filter model, sort model, and pagination if saved
        if (savedColumnConfiguration) {
            gridParams.columnApi.applyColumnState({ state: savedColumnConfiguration, applyOrder: true });
        }

        const savedFilterModel = localStorage.getItem('ag_filter_model');
        if (savedFilterModel) {
            try { gridParams.api.setFilterModel(JSON.parse(savedFilterModel)); } catch (error) {}
        }

        const savedSortModel = localStorage.getItem('ag_sort_model');
        if (savedSortModel) {
            try { gridParams.api.setSortModel(JSON.parse(savedSortModel)); } catch (error) {}
        }

        // Make columns fit available width so table uses space
        try {
            gridParams.api.sizeColumnsToFit();
        } catch (error) {}

        // Resize columns on window resize
        const handleWindowResize = () => {
            try { gridParams.api.sizeColumnsToFit(); } catch (error) {}
        };
        window.addEventListener('resize', handleWindowResize);

        // Store for cleanup if needed
        window._agGridResizeHandler = handleWindowResize;

        // Save api reference for pagination/state tracking
        window._agGridApi = gridParams.api;
        window._agGridColumnApi = gridParams.columnApi;
    };

    const handleColumnReorder = gridParams => {
        const currentColumnState = gridParams.columnApi.getColumnState();
        localStorage.setItem('columnState', JSON.stringify(currentColumnState));
    };

    const handleFilterUpdate = gridParams => {
        try {
            const filterModel = gridParams.api.getFilterModel();
            localStorage.setItem('ag_filter_model', JSON.stringify(filterModel));
        } catch (error) {}
    };

    const handleSortUpdate = gridParams => {
        try {
            const sortModel = gridParams.api.getSortModel();
            localStorage.setItem('ag_sort_model', JSON.stringify(sortModel));
        } catch (error) {}
    };

    return (
        <div style={{ width: '100%' }}>
            <div className="ag-theme-alpine" style={{ height: '620px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
                <AgGridReact
                    rowData={exchangeRateRecords}
                    columnDefs={tableColumnDefinitions}
                    defaultColDef={{ filter: true, sortable: true, resizable: true }}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    onGridReady={handleGridInitialization}
                    onColumnMoved={handleColumnReorder}
                    onFilterChanged={handleFilterUpdate}
                    onSortChanged={handleSortUpdate}
                    rowClass="custom-row"
                    domLayout={'normal'}
                />
            </div>
            <div style={{ marginTop: '12px', color: '#a0a0b0', fontSize: '13px' }}>Showing latest exchange rates. Use column headers to sort and filter.</div>
        </div>
    );
};

export default ExchangeRateTable;
