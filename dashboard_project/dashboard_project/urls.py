"""
URL configuration for dashboard_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from .views import serve_react, sync_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('currency_api.urls')),
    path('sync-data/', sync_data, name='sync_data'),  # Manual data sync endpoint
    re_path(r'^(?!api/|sync-data/).*$', serve_react),  # Catch all non-API routes and serve React app
]