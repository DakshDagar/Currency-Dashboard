# 💱 Currency Exchange Rates Dashboard

<div align="center">

**A Modern, Full-Stack Currency Exchange Rates Dashboard**

*Real-time data visualization with interactive charts and intelligent data tables*

[![Django](https://img.shields.io/badge/Django-5.0+-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![AG Grid](https://img.shields.io/badge/AG_Grid-31.3+-00A0DC?style=for-the-badge)](https://www.ag-grid.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🎯 Overview

The **Currency Exchange Rates Dashboard** is a comprehensive full-stack application that provides real-time visualization and analysis of historical currency exchange rates. The application fetches data from the Frankfurter API, stores it in a local database, and presents it through an elegant, dark-themed interface with advanced filtering, sorting, and visualization capabilities.

### Key Highlights

- **2 Years of Historical Data**: Track exchange rates for major currencies (CAD, USD, EUR) over the past 730 days
- **Interactive Visualizations**: Dynamic charts powered by Chart.js for trend analysis
- **Advanced Data Grid**: Sortable, filterable, and pageable table with persistent state management
- **Modern Dark Theme**: Sleek UI with gradient effects and smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **RESTful API**: Django REST Framework backend with flexible query parameters

---

## ✨ Features

### 📊 Data Visualization
- **Interactive Line Charts**: Visualize exchange rate trends over time with Chart.js
- **Multi-Currency Selection**: Toggle between CAD, USD, and EUR currencies
- **Smooth Animations**: Engaging transitions and hover effects
- **Responsive Charts**: Auto-resize charts based on viewport

### 📑 Advanced Data Table
- **AG Grid Integration**: Enterprise-grade data grid with 31.3+ features
- **Column Management**: Sortable, resizable, and reorderable columns
- **Advanced Filtering**: Built-in filter for all columns (ID, Date, Currencies, Rates)
- **Pagination**: Customizable page sizes (10, 20, 50, 100 rows)
- **State Persistence**: Grid settings saved in localStorage across sessions
- **Dark Theme Styling**: Custom-styled header with solid blue-purple background

### 🎨 User Interface
- **Modern Dark Theme**: Gradient backgrounds and glassmorphism effects
- **Sticky Header**: Navigation stays visible while scrolling
- **Hover Animations**: Interactive elements with smooth transitions
- **Responsive Layout**: Optimized for all screen sizes
- **Custom Scrollbars**: Styled scrollbars matching the dark theme

### 🔧 Backend Features
- **RESTful API**: Clean API endpoints with Django REST Framework
- **Database Storage**: SQLite database for fast local data access
- **Data Sync Commands**: Custom management command for fetching 2 years of historical rates
- **CORS Support**: Configured for seamless frontend-backend communication
- **Query Flexibility**: Filter by date range and currencies

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework for building interactive components |
| **Chart.js** | 4.4.3 | Data visualization library for charts |
| **react-chartjs-2** | 5.2.0 | React wrapper for Chart.js |
| **AG Grid React** | 31.3.2 | Enterprise data grid component |
| **ag-grid-community** | 31.3.2 | Core AG Grid functionality |
| **react-scripts** | 5.0.1 | Create React App build tooling |
| **web-vitals** | 5.1.0 | Performance metrics tracking |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Django** | 5.0+ - Web framework |
| **Django REST Framework** | RESTful API development |
| **Django CORS Headers** | Cross-origin resource sharing |
| **SQLite** | Embedded database |
| **Requests** | HTTP library for API calls |

### External APIs
- **Frankfurter API**: Free, open-source currency exchange rates API

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Frontend                           │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   App.js    │──│ExchangeRate │  │ExchangeRate │       │
│  │ (Main Shell)│  │Chart.js     │  │Table.js     │       │
│  │             │  │ (Viz Layer)  │  │ (Data Grid) │       │
│  └─────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP Requests (Fetch API)
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Django Backend (REST API)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            currency_api App                           │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │   │
│  │  │  views.py  │  │ models.py  │  │serializers │     │   │
│  │  │ (API Logic)│  │ (DB Schema)│  │   .py      │     │   │
│  │  └────────────┘  └────────────┘  └────────────┘     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                      SQLite Database
                            │
                    ┌──────────────┐
                    │ExchangeRate  │
                    │   Model      │
                    └──────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python**: 3.8 or higher ([Download](https://www.python.org/downloads/))
- **Node.js**: 14.x or higher ([Download](https://nodejs.org/))
- **npm**: 6.x or higher (included with Node.js)
- **Git**: For cloning the repository

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Currency_Dashboard--main
```

### Step 2: Backend Setup (Django)

#### 2.1 Create Virtual Environment (Recommended)

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Install Python Dependencies

```bash
pip install django djangorestframework django-cors-headers requests
```

Or if you have a `requirements.txt`:
```bash
pip install -r requirements.txt
```

#### 2.3 Navigate to Django Project

```bash
cd dashboard_project
```

#### 2.4 Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### 2.5 Fetch Initial Exchange Rate Data

```bash
python manage.py sync_exchange_rates
```

This command will:
- Connect to the Frankfurter API
- Fetch 730 days (2 years) of historical exchange rates
- Populate your local database

#### 2.6 Start Django Development Server

```bash
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/`

✅ **Backend Setup Complete!** Keep this terminal running.

---

### Step 3: Frontend Setup (React)

Open a **new terminal window** and navigate to the project root:

#### 3.1 Install Node Dependencies

```bash
npm install
```

This will install:
- React and React DOM
- Chart.js and react-chartjs-2
- AG Grid React
- Web Vitals
- React Scripts

#### 3.2 Start React Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000/`

✅ **Frontend Setup Complete!**

---

## 📖 Usage

### Accessing the Dashboard

1. Ensure both Django backend (`http://127.0.0.1:8000`) and React frontend (`http://localhost:3000`) are running
2. Open your browser and navigate to `http://localhost:3000`

### Using the Chart

- **Currency Buttons**: Click on CAD, USD, or EUR buttons to toggle currency display
- **Multiple Selection**: Select multiple currencies to compare trends
- **Hover Effects**: Hover over data points to see exact values

### Using the Data Table

#### Filtering
1. Click on the filter icon in any column header
2. Enter your filter criteria
3. Press Enter or click Apply

#### Sorting
- Click on column headers to sort ascending/descending
- Hold Shift and click multiple headers for multi-column sorting

#### Pagination
- Use the dropdown at the bottom to change page size (10, 20, 50, 100)
- Navigate pages using the arrow buttons

#### Column Management
- Drag column headers to reorder
- Resize columns by dragging column edges
- All changes are automatically saved to localStorage

---

## 📡 API Documentation

### Base URL
```
http://127.0.0.1:8000/api/
```

### Endpoints

#### Get Exchange Rates
```http
GET /exchange_rates/
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `start_date` | string (YYYY-MM-DD) | No | Filter rates from this date |
| `end_date` | string (YYYY-MM-DD) | No | Filter rates until this date |
| `currencies` | string | No | Comma-separated currency codes (e.g., "CAD,USD,EUR") |

**Example Request:**
```bash
GET http://127.0.0.1:8000/api/exchange_rates/?start_date=2025-01-01&end_date=2025-12-31&currencies=CAD,USD
```

**Example Response:**
```json
[
  {
    "id": 1,
    "date": "2025-01-15",
    "base_currency": "EUR",
    "target_currency": "CAD",
    "rate": 1.4523
  },
  {
    "id": 2,
    "date": "2025-01-15",
    "base_currency": "EUR",
    "target_currency": "USD",
    "rate": 1.0842
  }
]
```

**Status Codes:**
- `200 OK`: Successful request
- `400 Bad Request`: Invalid parameters
- `500 Internal Server Error`: Server error

---

## 📂 Project Structure

```
Currency_Dashboard--main/
│
├── dashboard_project/           # Django Backend
│   ├── manage.py               # Django management script
│   ├── db.sqlite3              # SQLite database
│   │
│   ├── dashboard_project/      # Main Django project
│   │   ├── __init__.py
│   │   ├── settings.py         # Project settings (CORS, Apps, DB)
│   │   ├── urls.py             # Main URL routing
│   │   ├── views.py            # Base views
│   │   ├── wsgi.py             # WSGI config
│   │   └── asgi.py             # ASGI config
│   │
│   └── currency_api/           # Django app for currency exchange API
│       ├── models.py           # ExchangeRate model
│       ├── views.py            # API views (DRF ViewSet)
│       ├── serializers.py      # DRF serializers
│       ├── urls.py             # App-level routing
│       ├── admin.py            # Django admin config
│       ├── apps.py             # App configuration
│       ├── tests.py            # Unit tests
│       │
│       ├── management/         # Custom management commands
│       │   └── commands/
│       │       └── sync_exchange_rates.py  # Data sync command
│       │
│       └── migrations/         # Database migrations
│           ├── 0001_initial.py
│           └── __init__.py
│
├── src/                        # React Frontend Source
│   ├── App.js                  # Main application component
│   ├── App.css                 # Global styles (dark theme)
│   ├── index.js                # React entry point
│   ├── index.css               # Base CSS
│   ├── setupTests.js           # Test configuration
│   ├── reportWebVitals.js      # Performance metrics
│   │
│   └── dashboard_components/   # React components
│       ├── ExchangeRateChart.js # Chart.js line chart component
│       └── ExchangeRateTable.js # AG Grid table component
│
├── public/                     # Static assets
│   └── index.html              # HTML template
│
├── package.json                # Node.js dependencies
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

---

## ⚙️ Configuration

### Django Settings (`dashboard_project/settings.py`)

#### CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

#### Installed Apps
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'currency_api',
]
```

#### Database
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### React Configuration

#### API Base URL
Located in `src/dashboard_components/` files:
```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api/';
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**

**Django (Port 8000):**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**React (Port 3000):**
```bash
# Set alternative port
set PORT=3001 && npm start  # Windows
PORT=3001 npm start         # macOS/Linux
```

#### 2. **CORS Errors**

Ensure `django-cors-headers` is installed and configured:
```bash
pip install django-cors-headers
```

Add to `settings.py`:
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Must be at the top
    # ... other middleware
]
```

#### 3. **Module Not Found Errors**

**Backend:**
```bash
pip install django djangorestframework django-cors-headers requests
```

**Frontend:**
```bash
npm install
```

If issues persist:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 4. **Database Migration Errors**

Reset migrations:
```bash
python manage.py migrate --run-syncdb
```

#### 5. **Empty Data in Frontend**

1. Check Django server is running: `http://127.0.0.1:8000/api/exchange_rates/`
2. Verify data exists in database:
   ```bash
   python manage.py shell
   >>> from currency_api.models import ExchangeRate
   >>> ExchangeRate.objects.count()
   ```
3. Run data fetch command:
   ```bash
   python manage.py sync_exchange_rates
   ```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the issue already exists
2. Create a detailed issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, Python version, Node version)

### Suggesting Features
1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples or mockups if possible

### Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Frankfurter API**: For providing free currency exchange rate data
- **AG Grid Community**: For the powerful data grid component
- **Chart.js**: For beautiful and responsive charts
- **Django & React Communities**: For excellent documentation and support

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

<div align="center">

**Made with ❤️ using Django and React**

⭐ Star this repository if you find it helpful!

</div>
