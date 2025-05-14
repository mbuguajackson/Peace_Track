#libraries
library(dplyr)
library(readr)
library(jsonlite)
library(sf)

#acled data
south_sudan <- read_csv("/home/dev-jack/Documents/projects/Peace_Track/acled_data/2020-01-01-2024-12-31-South_Sudan.csv", show_col_types = FALSE)

##Get data for Abyei state
sudan <- read_csv("/home/dev-jack/Documents/projects/Peace_Track/acled_data/2020-01-01-2024-12-31-Sudan.csv", show_col_types = FALSE)

abyei<- sudan %>%
  filter(admin1=="Abyei")

#merge abyei with ssd data
data <- rbind(south_sudan,abyei)

#convert to geojson 
data<- st_as_sf(data, coords = c("longitude", "latitude"), crs= 4326)
st_write(data, "/home/dev-jack/Documents/projects/Peace_Track/PT/TrackerApp/data/conflict_data.geojson")
#write json
#write_json(data, "/home/dev-jack/Documents/projects/Peace_Track/acled_data/acled_data.json")