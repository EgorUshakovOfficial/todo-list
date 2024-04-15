from django.urls import path
from api.v1.userstory.views import create_user_story_view

# User story API endpoints go here
urlpatterns = [
    path('new', create_user_story_view, name='create-user-story')
]
