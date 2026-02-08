from django.http import FileResponse, HttpResponse
from django.conf import settings
import os

def serve_react(request):
    """Serve React app's index.html for SPA routing"""
    # Try multiple possible locations for the build folder
    possible_paths = [
        os.path.join(settings.BASE_DIR.parent, 'build', 'index.html'),
        os.path.join(settings.BASE_DIR, '..', 'build', 'index.html'),
        os.path.join('/opt/render/project/src', 'build', 'index.html'),
    ]
    
    for index_path in possible_paths:
        if os.path.exists(index_path):
            return FileResponse(open(index_path, 'rb'), content_type='text/html')
    
    # Debug info
    debug_info = f"React app not built. Tried paths: {possible_paths}. BASE_DIR: {settings.BASE_DIR}"
    return HttpResponse(debug_info, status=404)