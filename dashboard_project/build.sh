#!/usr/bin/env bash
# exit on error
set -o errexit

echo "=== Current directory: $(pwd) ==="

# Install Python dependencies
echo "=== Installing Python Dependencies ==="
pip install -r requirements.txt

# Collect static files (includes React build from git)
echo "=== Collecting Static Files ==="
python manage.py collectstatic --no-input

# Run migrations
echo "=== Running Migrations ==="
python manage.py migrate

# Sync exchange rates
echo "=== Syncing Exchange Rates ==="
python manage.py sync_exchange_rates

echo "=== Build complete ==="
