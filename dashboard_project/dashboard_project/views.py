from django.http import FileResponse
from django.conf import settings
import os

def serve_react(request):
    """Serve React app's index.html for SPA routing"""
    index_path = os.path.join(settings.BASE_DIR.parent, 'build', 'index.html')
    if os.path.exists(index_path):
        return FileResponse(open(index_path, 'rb'), content_type='text/html')
    from django.http import HttpResponse
    return HttpResponse("React app not built. Run 'npm run build'", status=404)