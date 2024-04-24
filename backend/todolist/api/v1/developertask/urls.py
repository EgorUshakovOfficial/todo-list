from django.urls import path
from api.v1.developertask.views import create_developer_task_view, delete_developer_task_view, edit_developer_task_view,  retrieve_developer_task_view, retrieve_developer_tasks_view

urlpatterns = [
    path('', retrieve_developer_tasks_view, name='retrieve-developer-tasks'),
    path('<uuid:developer_task_id>', retrieve_developer_task_view, name='retrieve-developer-task'),
    path('<uuid:developer_task_id>/delete', delete_developer_task_view, name='delete-developer-task'),
    path('new', create_developer_task_view, name='create-developer-task'),
    path('<uuid:developer_task_id>/partial', edit_developer_task_view, name='edit-developer-task')
]

