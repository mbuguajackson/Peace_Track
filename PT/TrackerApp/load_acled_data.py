import os
from django.contrib.gis.utils import LayerMapping
from .models import conflict_data

conflict_data_mapping = {
    'event_id_cnty': 'event_id_cnty',
    'event_date': 'event_date',
    'year': 'year',
    'time_precision': 'time_precision',
    'disorder_type': 'disorder_type',
    'event_type': 'event_type',
    'sub_event_type': 'sub_event_type',
    'actor1': 'actor1',
    'assoc_actor_1': 'assoc_actor_1',
    'inter1': 'inter1',
    'actor2': 'actor2',
    'assoc_actor_2': 'assoc_actor_2',
    'inter2': 'inter2',
    'interaction': 'interaction',
    'civilian_targeting': 'civilian_targeting',
    'iso': 'iso',
    'region': 'region',
    'country': 'country',
    'admin1': 'admin1',
    'admin2': 'admin2',
    'admin3': 'admin3',
    'location': 'location',
    'geo_precision': 'geo_precision',
    'source': 'source',
    'source_scale': 'source_scale',
    'notes': 'notes',
    'fatalities': 'fatalities',
    'tags': 'tags',
    'timestamp': 'timestamp',
    'geom': 'MULTIPOINT',
}

geojson_file = os.path.join(os.path.dirname(__file__), 'data/conflict_data.geojson')

conflict_data = LayerMapping(
    conflict_data, #model name
    geojson_file, #path to the file
    conflict_data_mapping #mapping
)

#save
conflict_data.save(strict=True, verbose=True)