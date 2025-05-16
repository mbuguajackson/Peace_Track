var map = L.map('map').setView([7.9570, 31.3070], 6);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
	subdomains: 'abcd'
}).addTo(map);

var cfg = {
    radius: 20,
    maxOpacity: 0.8,
    scaleRadius: true,
    useLocalExtrema: true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
};
var heatmapLayer = new HeatmapOverlay(cfg).addTo(map);

var allEventData = null;

$.getJSON(conflictDataUrl, function(data) {
    allEventData = data;
    updateMap('all');
});

function updateMap(selectedYear) {
    var filteredFeatures = selectedYear === 'all' ? allEventData.features : allEventData.features.filter(function(feature) {
        var eventYear = new Date(feature.properties.event_date).getFullYear();
        return eventYear == selectedYear;
    });

    var heatData = {
        max: 10,  // or compute dynamically
        data: filteredFeatures.map(function(feature) {
            return {
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
                count: 1  // or use a property for intensity
            };
        })
    };

    heatmapLayer.setData(heatData);
}

// Dropdown listener
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