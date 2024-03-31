from django.urls import path
from .views import login_view, logout_view, register_user_view, retrieve_user_view, \
    refresh_access_token_view, partial_user_edit_view, delete_user_view

urlpatterns = [
    path('login', login_view, name='login-view'),
    path('logout', logout_view, name='logout-view'),
    path('register', register_user_view, name='register-user'),
    path('me', retrieve_user_view, name='retrieve-name'),
    path('refresh', refresh_access_token_view, name='refresh-access-token'),
    path('partial', partial_user_edit_view, name='partial-user-update'),
    path('delete', delete_user_view, name='delete-user')
]