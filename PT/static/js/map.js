var map = L.map('map').setView([7.9570, 31.3070], 6);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd'
}).addTo(map);


//event data
// Step 1: Create the empty GeoJSON layer with options
var allEventData = null;  // store all fetched data
var event1 = L.geoJson(null, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng);
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<b>" + feature.properties.event_id_cnty + "</b><br>" + feature.properties.notes);
    }
});

$.getJSON(conflictDataUrl, function(data) {
    allEventData = data;
    updateMap('all');  // show all by default
});

// Function to update map with filtered data
function updateMap(selectedYear) {
    event1.clearLayers();

    var filtered = selectedYear === 'all' ? allEventData.features : allEventData.features.filter(function(feature) {
        var eventYear = new Date(feature.properties.event_date).getFullYear();
        return eventYear == selectedYear;
    });

    event1.addData({
        type: 'FeatureCollection',
        features: filtered
    });
    event1.addTo(map);
}

// Listener for the dropdown
document.getElementById('yearFilter').addEventListener('change', function(e) {
    updateMap(e.target.value);
});


















//shapefile data
// Step 1: Create the empty GeoJSON layer with options
var level_1 = L.geoJson(null, {
	style: function (feature) {
		return {
			color: "white",
			weight: 1,
			opacity: 1,
			fillColor: "#ff7800",
			fillOpacity: 0.1
		};
	},
	onEachFeature: function (feature, layer) {
		layer.bindPopup("<b>" + feature.properties.name_1 + "</b><br>" );
	}
});

$.getJSON(level_1_url, function(data) {
	console.log("Loaded shapefile:", data);
    level_1.addData(data);
    level_1.addTo(map);
});