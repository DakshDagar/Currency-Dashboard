#!/usr/bin/env bash
# exit on error
set -o errexit

# Build React frontend
echo "=== Building React Frontend ==="
cd ..
pwd
ls -la
npm install
npm run build
ls -la build/
cd dashboard_project

# Install Python dependencies and setup Django
echo "=== Installing Python Dependencies ==="
pip install -r requirements.txt

echo "=== Collecting Static Files ==="
python manage.py collectstatic --no-input

echo "=== Running Migrations ==="
python manage.py migrate

echo "=== Syncing Exchange Rates ==="
python manage.py sync_exchange_rates
