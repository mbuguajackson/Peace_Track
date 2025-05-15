from django.urls import path
from .views import HomePageView, ConflictDataAPI,StateBoundariesAPI


urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('conflict_data/api',ConflictDataAPI.as_view(), name='conflict_data_api'),
    path('state_boundaries/api',StateBoundariesAPI.as_view(), name='state_boundaries_api'),
]