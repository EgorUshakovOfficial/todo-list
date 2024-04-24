from django.urls import path
from api.v1.userstory.views import create_user_story_view, delete_user_story_view,  partial_edit_user_story_view, retrieve_user_stories_view, retrieve_user_story_view

urlpatterns = [
    path('', retrieve_user_stories_view, name='retrieve-user-stories'),
    path('<uuid:user_story_id>/delete', delete_user_story_view, name='delete-user-story'),
    path('<uuid:user_story_id>', retrieve_user_story_view, name='retrieve-user-story'),
    path('<uuid:user_story_id>/partial', partial_edit_user_story_view, name='partial-edit-user-story'),
    path('new', create_user_story_view, name='create-user-story'),
]
