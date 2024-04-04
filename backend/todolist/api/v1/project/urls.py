from django.urls import path
from api.v1.project.views import retrieve_project_list_view, retrieve_project_view, create_project_view, delete_project_view, partial_edit_project_view

urlpatterns = [
    path('', retrieve_project_list_view, name='retrieve-project-list'),
    path('<uuid:project_id>', retrieve_project_view, name='retrieve-project'),
    path('<uuid:project_id>/delete', delete_project_view, name='delete_project'),
    path('<uuid:project_id>/partial', partial_edit_project_view, name='partial-edit-project'),
    path('new', create_project_view, name='create-project')
]