from django.shortcuts import render

from .models import conflict_data, ssd_level_1
from django.views.generic import TemplateView
from .serializers import ConflictDataSerializer, StateBoundariesSerializer

from rest_framework import generics


# Create your views here.
class HomePageView(TemplateView):
    template_name = "index.html"

#conflict data API
class ConflictDataAPI(generics.ListAPIView):
    queryset = conflict_data.objects.all()
    serializer_class = ConflictDataSerializer

#state boundaries API
class StateBoundariesAPI(generics.ListAPIView):
    queryset = ssd_level_1.objects.all()
    serializer_class = StateBoundariesSerializer