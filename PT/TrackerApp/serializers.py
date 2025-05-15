from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import conflict_data, ssd_level_1

class ConflictDataSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = conflict_data
        fields = '__all__'
        geo_field = 'geom'

class StateBoundariesSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = ssd_level_1
        fields = '__all__'
        geo_field = 'geom'
