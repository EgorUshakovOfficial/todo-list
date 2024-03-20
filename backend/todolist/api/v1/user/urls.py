from django.urls import path
from .views import login_view, register_user_view, retrieve_user_view, refresh_access_token_view

urlpatterns = [
    path('login', login_view, name='login-view'),
    path('register', register_user_view, name='register-user'),
    path('me', retrieve_user_view, name='retrieve-name'),
    path('refresh', refresh_access_token_view, name='refresh-access-token')
]