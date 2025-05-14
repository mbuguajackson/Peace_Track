library(sf)
library(dplyr)
library(stringr)

ssd_data= read_sf("/home/dev-jack/Documents/projects/Peace_Track/acled_data/conflict_data.geojson")

#keyword search
keywords <- c("cattle", "raiding", "cattle raiding", "livestock", "herder", "pastoralist", "rustling")

cattle_conflicts <- ssd_data%>%
  filter(
    str_detect(tolower(notes), paste(keywords, collapse = "|")) 
  )

#export as geojson

st_write(cattle_conflicts, "/home/dev-jack/Documents/projects/Peace_Track/PT/TrackerApp/data/cattle_conflicts.geojson")