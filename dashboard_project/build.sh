#!/usr/bin/env bash
# exit on error
set -o errexit

echo "=== Current directory: $(pwd) ==="
echo "=== DATABASE_URL is set: $(if [ -n "$DATABASE_URL" ]; then echo 'YES'; else echo 'NO'; fi) ==="

# Rebuild React app (it's in parent directory since rootDirectory is dashboard_project)
if [ -d "../src" ] && [ -f "../package.json" ]; then
  echo "=== Building React App ==="
  cd ..
  npm install
  npm run build
  cd dashboard_project
  echo "=== React build complete ==="
fi

# Install Python dependencies
echo "=== Installing Python Dependencies ==="
pip install -r requirements.txt

# Run  migrations FIRST to ensure database is ready
echo "=== Running Migrations ==="
python manage.py migrate --noinput
echo "=== Migrations complete ==="

# Check if tables exist
echo "=== Checking database tables ==="
python manage.py showmigrations

# Collect static files (includes React build)
echo "=== Collecting Static Files ==="
python manage.py collectstatic --no-input

# Sync exchange rates
echo "=== Syncing Exchange Rates ==="
python manage.py sync_exchange_rates || echo "Warning: Failed to sync exchange rates, will retry later"

echo "=== Build complete ==="
