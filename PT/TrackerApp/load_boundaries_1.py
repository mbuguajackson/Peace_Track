import os
from django.contrib.gis.utils import LayerMapping
from .models import ssd_level_1

ssd_level_1_mapping = {
    'gid_1': 'GID_1',
    'gid_0': 'GID_0',
    'country': 'COUNTRY',
    'name_1': 'NAME_1',
    'varname_1': 'VARNAME_1',
    'nl_name_1': 'NL_NAME_1',
    'type_1': 'TYPE_1',
    'engtype_1': 'ENGTYPE_1',
    'cc_1': 'CC_1',
    'hasc_1': 'HASC_1',
    'iso_1': 'ISO_1',
    'geom': 'MULTIPOLYGON',
}
geojson_file = os.path.join(os.path.dirname(__file__), 'data/ssd_level_1.json')

boundaries = LayerMapping(
    ssd_level_1, #model name
    geojson_file, #path to the file
    ssd_level_1_mapping #mapping
)

#save
boundaries.save(strict=True, verbose=True)