#!/usr/bin/env bash
# exit on error
set -o errexit

# Build React frontend
cd ..
npm install
npm run build
cd dashboard_project

# Install Python dependencies and setup Django
pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate
python manage.py sync_exchange_rates
