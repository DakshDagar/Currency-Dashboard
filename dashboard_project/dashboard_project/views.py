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

def sync_data(request):
    """Manually trigger data sync"""
    try:
        call_command('sync_exchange_rates')
        return HttpResponse("Data sync completed successfully!", status=200)
    except Exception as e:
        return HttpResponse(f"Data sync failed: {str(e)}", status=500)