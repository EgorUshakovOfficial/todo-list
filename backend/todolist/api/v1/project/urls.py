from django.urls import path
from api.v1.project.views import retrieve_project_list_view, create_project_view

urlpatterns = [
    path('', retrieve_project_list_view, name='retrieve-project-list'),
    path('new', create_project_view, name='create-project')
]