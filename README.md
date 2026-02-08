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

The **Currency Exchange Rates Dashboard** is a comprehensive full-stack application that provides real-time visualization and analysis of historical currency exchange rates. The application fetches data from the Frankfurter API, stores it in a PostgreSQL database, and presents it through an elegant, dark-themed interface with advanced filtering, sorting, and visualization capabilities.

### Live Demo
🔗 **[currency-dashboard-hml9.onrender.com](https://currency-dashboard-hml9.onrender.com)**

### Key Highlights

- **2 Years of Historical Data**: Track exchange rates for major currencies (CAD, USD, EUR) over the past 730 days
- **Interactive Visualizations**: Dynamic charts powered by Chart.js for trend analysis
- **Advanced Data Grid**: Sortable, filterable, and pageable table with persistent state management
- **Modern Dark Theme**: Sleek UI with gradient effects and smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **RESTful API**: Django REST Framework backend with flexible query parameters
- **Cloud Hosted**: Deployed on Render with PostgreSQL database

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
| **PostgreSQL** | Cloud database on Render |
| **psycopg3** | PostgreSQL adapter for Python |
| **dj-database-url** | Database URL parsing |
| **Gunicorn** | WSGI application server |
| **Whitenoise** | Static file serving |
| **Requests** | HTTP library for API calls

### Deployment
| Service | Purpose |
|---------|---------|
| **Render** | Cloud platform for hosting Django + React app |
| **PostgreSQL (Render)** | Managed PostgreSQL database |

---

## 🏗 Architecture

### Unified Render Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                   Render Web Service                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Django Backend (Python 3.13)               │   │
│  │      Serves React App + RESTful API                  │   │
│  │                                                       │   │
│  │  ┌────────────┐  ┌──────────┐  ┌──────────────┐     │   │
│  │  │ React App  │  │ Currency │  │Sync Endpoint │     │   │
│  │  │(Built JS)  │  │  API     │  │(Data Fetch)  │     │   │
│  │  └────────────┘  └──────────┘  └──────────────┘     │   │
│  │                                                       │   │
│  │  Components:                                          │   │
│  │  • ExchangeRateChart.js (Chart.js visualization)    │   │
│  │  • ExchangeRateTable.js (AG Grid data table)        │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│         PostgreSQL Database (Render Managed)                 │
│                                                               │
│         • ExchangeRate Model (730 days of data)              │
│         • 630+ records (CAD, USD, EUR rates)                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
                   ┌──────────────────┐
                   │ Frankfurter API  │
                   │ (Exchange Rates) │
                   └──────────────────┘
```

### How It Works

1. **Frontend (React)** - Loaded as static files served by Django
   - `ExchangeRateChart.js` fetches data from `/api/exchange_rates/` and displays interactive charts
   - `ExchangeRateTable.js` displays data in a sortable, filterable AG Grid table

2. **Backend (Django REST API)** - Serves both static files and API
   - REST endpoints return JSON exchange rate data
   - Manages PostgreSQL database with Django ORM
   - Runs synchronization tasks to fetch latest rates from Frankfurter API

3. **Database (PostgreSQL)** - Persistent data storage on Render
   - Stores 730 days of historical exchange rate data
   - Managed by Render for reliability and automatic backups

---

## 🚀 Quick Start

### Using the Live Application

**Access the deployed dashboard here**: 🔗 **[currency-dashboard-hml9.onrender.com](https://currency-dashboard-hml9.onrender.com)**

The application is fully hosted on Render and ready to use without any local installation.

### Manual Data Synchronization

If you need to manually sync exchange rate data:

1. Visit the health check endpoint: `/health/` to verify database connection
2. Visit the sync endpoint: `/sync-data/` to fetch and populate data from Frankfurter API
3. Return to the dashboard to view updated exchange rates

---

## 💻 Local Development (Optional)

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python**: 3.13 or higher ([Download](https://www.python.org/downloads/))
- **Node.js**: 18.x or higher ([Download](https://nodejs.org/))
- **npm**: 9.x or higher (included with Node.js)
- **Git**: For cloning the repository

### Step 1: Clone the Repository

```bash
git clone https://github.com/DakshDagar/Currency-Dashboard.git
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

#### 2.4 Install Python Dependencies

Navigate to the Django project:
```bash
cd dashboard_project
pip install -r requirements.txt
```

#### 2.5 Configure Database (Local Development)

For local development, SQLite is used by default. For production on Render, set the `DATABASE_URL` environment variable pointing to PostgreSQL.

**Local SQLite setup:**
```bash
python manage.py migrate
python manage.py sync_exchange_rates
```

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

### Accessing the Live Application

Simply visit: 🔗 **[currency-dashboard-hml9.onrender.com](https://currency-dashboard-hml9.onrender.com)**

No installation or setup required!

### Features

#### Exchange Rate Chart
- **Currency Buttons**: Click on CAD, USD, or EUR buttons to toggle currency display
- **Multiple Selection**: Select multiple currencies to compare trends
- **Hover Effects**: Hover over data points to see exact values
- **730 Days of Data**: View 2 years of historical exchange rate trends

#### Data Table
- **Sorting**: Click column headers to sort data
- **Filtering**: Built-in filters for all columns (ID, Date, Currency, Rate)
- **Pagination**: Navigate through data with customizable page sizes
- **Responsive**: Optimized for desktop and tablet viewing

---

## 📡 API Documentation

### Base URL (Production)
```
https://currency-dashboard-hml9.onrender.com/api/
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
GET https://currency-dashboard-hml9.onrender.com/api/exchange_rates/?start_date=2025-01-01&end_date=2025-12-31&currencies=CAD,USD
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
## 📂 Project Structure

```
Currency_Dashboard--main/
│
├── dashboard_project/           # Django Backend
│   ├── manage.py               # Django management script
│   ├── requirements.txt        # Python dependencies
│   ├── build.sh                # Render deployment script
│   ├── render.yaml             # Render configuration
│   │
│   ├── dashboard_project/      # Main Django project
│   │   ├── __init__.py
│   │   ├── settings.py         # Project settings (CORS, Apps, DB, Static Files)
│   │   ├── urls.py             # Main URL routing
│   │   ├── views.py            # Django views + React serve + API health
│   │   ├── wsgi.py             # WSGI config (Gunicorn)
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
│       │       └── sync_exchange_rates.py  # Frankfurter API data sync
│       │
│       └── migrations/         # Database migrations
│           ├── 0001_initial.py
│           └── __init__.py
│
├── build/                      # React Production Build (deployed to Render)
│   ├── index.html
│   └── static/                 # Compiled JS and CSS
│       ├── js/
│       └── css/
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
├── package.json                # React dependencies
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

---

## ⚙️ Configuration

### Environment Variables (Production - Render)

The following environment variables are automatically set in Render:

```env
DATABASE_URL=postgresql://user:password@host/dbname
SECRET_KEY=<auto-generated>
DEBUG=False
PYTHON_VERSION=3.13.0
NODE_VERSION=18
```

### Django Settings (`dashboard_project/settings.py`)

#### Database Configuration (Auto-detected from DATABASE_URL)
```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        conn_health_checks=True,
        engine='django.db.backends.postgresql'
    )
}
```

#### Static Files Configuration (Whitenoise)
```python
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR.parent, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR.parent, 'build', 'static')]
WHITENOISE_AUTOREFRESH = True
WHITENOISE_USE_FINDERS = True
```

#### CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    "https://currency-dashboard-hml9.onrender.com",
]
```

### React Configuration

#### API Base URL
Located in `src/dashboard_components/` files:
```javascript
const API_BASE_URL = '/api';  // Uses relative path for any domain
```

---

## 🚀 Deployment (Render)

### Prerequisites
- GitHub repository with your code pushed
- Render account (free tier available)

### Setup Steps

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - In Render dashboard, click "New +"
   - Select "PostgreSQL"
   - Choose free tier (0.5 GB)
   - Copy the Internal Database URL

3. **Create Web Service**
   - In Render dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: currency-dashboard (or your choice)
     - **Root Directory**: `./dashboard_project`
     - **Runtime**: Python 3.13
     - **Build Command**: `chmod +x ./build.sh && ./build.sh`
     - **Start Command**: `gunicorn dashboard_project.wsgi:application`

4. **Connect Database**
   - In Web Service environment variables, add:
     - `DATABASE_URL`: (copy from PostgreSQL database)
     - `SECRET_KEY`: (auto-generate)
     - `DEBUG`: `False`
     - `NODE_VERSION`: `18`

5. **Deploy**
   - Render automatically deploys on push to GitHub
   - Builds React, runs migrations, syncs data

### Monitoring

- **Render Dashboard**: Monitor logs and deployment status
- **Health Check**: Visit `/health/` endpoint to verify database connection
- **API Status**: Visit `/api/exchange_rates/` to check API

---

## 🐛 Troubleshooting

### Production (Render)

#### Issue: Static Files Not Loading
**Solution**: 
- Ensure `build.sh` runs during deployment
- Check Render logs for "collectstatic" success message
- Rebuild deployment: Render Dashboard → Web Service → Manual Deploy

#### Issue: API Returns 500 Error
**Solution**:
1. Check `/health/` endpoint for database connection
2. Visit `/sync-data/` to manually populate data if needed
3. Check Render logs for specific error messages

#### Issue: Data Not Syncing
**Solution**:
1. Ensure Frankfurter API is accessible
2.  Visit `/sync-data/` endpoint to manually trigger sync
3. Check logs in Render dashboard

### Local Development

#### Port Already in Use
```bash
# Kill process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <process_id> /F

# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
```

#### Module Not Found
```bash
# Backend
pip install -r dashboard_project/requirements.txt

# Frontend
npm install
npm run build
```

#### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Render environment
- Ensure PostgreSQL database is created in Render
- Run migrations: Visit `/run-migrations/` endpoint in production

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check if the issue already exists
2. Create a detailed issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

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
- **Render**: For reliable cloud hosting with PostgreSQL support

---

## 📞 Support

If you encounter any issues:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

<div align="center">

**Made with ❤️ using Django and React**

⭐ Star this repository if you find it helpful!

</div>
