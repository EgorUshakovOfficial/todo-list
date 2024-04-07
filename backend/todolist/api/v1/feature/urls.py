from django.urls import path
from api.v1.feature.views import create_feature_view, retrieve_features_view

urlpatterns = [
    path('', retrieve_features_view, name='retrieve-features'),
    path('new', create_feature_view, name='create-feature')
]