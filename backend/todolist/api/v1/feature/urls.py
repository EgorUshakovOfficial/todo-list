from django.urls import path
from api.v1.feature.views import create_feature_view, retrieve_features_view, partial_edit_feature_view, delete_feature_view

urlpatterns = [
    path('', retrieve_features_view, name='retrieve-features'),
    path('new', create_feature_view, name='create-feature'),
    path('<uuid:feature_id>/partial', partial_edit_feature_view, name='partial-edit-feature'),
    path('<uuid:feature_id>/delete', delete_feature_view, name='delete-feature')
]