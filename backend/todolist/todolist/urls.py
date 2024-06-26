"""
URL configuration for todolistapi project.

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
from django.urls import path, include

urlpatterns = [
    path('api/v1/user/', include('api.v1.user.urls')),
    path('api/v1/projects/', include('api.v1.project.urls')),
    path('api/v1/projects/<uuid:project_id>/features/', include('api.v1.feature.urls')),
    path('api/v1/features/<uuid:feature_id>/stories/', include('api.v1.userstory.urls')),
    path('api/v1/stories/<uuid:user_story_id>/tasks/', include('api.v1.developertask.urls'))
]
