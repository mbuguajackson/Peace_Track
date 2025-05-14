import os
from django.contrib.gis.utils import LayerMapping
from .models import ssd_level_0

ssd_level_0_mapping = {
    'gid_0': 'GID_0',
    'country': 'COUNTRY',
    'geom': 'MULTIPOLYGON',
}

geojson_file = os.path.join(os.path.dirname(__file__), 'data/ssd_level_0.geojson')

boundaries = LayerMapping(
    ssd_level_0, #model name
    geojson_file, #path to the file
    ssd_level_0_mapping #mapping
)

#save
boundaries.save(strict=True, verbose=True)