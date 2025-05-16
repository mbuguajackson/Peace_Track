library(sf)

level_1= read_sf("https://geodata.ucdavis.edu/gadm/gadm4.1/json/gadm41_SSD_0.json")


#export as geojson

st_write(level_1, "/home/dev-jack/Documents/projects/Peace_Track/PT/TrackerApp/data/level_1.geojson")