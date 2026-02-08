from django.http import FileResponse, HttpResponse
from django.conf import settings
from django.core.management import call_command
import os

def serve_react(request):
    """Serve React app's index.html for SPA routing"""
    # Path to index.html in the build folder
    index_path = os.path.join(settings.BASE_DIR.parent, 'build', 'index.html')
    
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    
    # Debug info if file not found
    return HttpResponse(
        f"index.html not found at: {index_path}<br>"
        f"BASE_DIR: {settings.BASE_DIR}<br>"
        f"Parent: {settings.BASE_DIR.parent}<br>"
        f"Exists: {os.path.exists(index_path)}",
        status=404
    )

def health_check(request):
    """Check database connection and app health"""
    try:
        from django.db import connection
        from currency_api.models import ExchangeRate
        
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
        
        # Check if table exists and has data
        count = ExchangeRate.objects.count()
        
        return HttpResponse(
            f"✅ Health Check PASSED<br>"
            f"Database: Connected<br>"
            f"Database Type: {connection.settings_dict['ENGINE']}<br>"
            f"Exchange Rate Records: {count}<br>"
            f"DEBUG: {settings.DEBUG}<br>",
            status=200
        )
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        return HttpResponse(
            f"❌ Health Check FAILED<br>"
            f"<pre>{error_details}</pre>",
            status=500
        )

def sync_data(request):
    """Manually trigger data sync"""
    try:
        from django.db import connection
        # Test database connection first
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        
        call_command('sync_exchange_rates')
        return HttpResponse("Data sync completed successfully!", status=200)
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        return HttpResponse(f"Data sync failed:<br><pre>{error_details}</pre>", status=500)