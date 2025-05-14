from django.shortcuts import render

from .models import conflict_data, ssd_level_0
from django.views.generic import TemplateView


# Create your views here.
class HomePageView(TemplateView):
    template_name = "index.html"

