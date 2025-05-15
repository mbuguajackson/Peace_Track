function updateTotalEvents(features, selectedYear) {
    const total = features.filter(feature => {
        const year = new Date(feature.properties.event_date).getFullYear();
        return selectedYear === 'all' || year == selectedYear;
    }).length;

    document.getElementById('total-events-count').textContent = total;
}

$.getJSON(conflictDataUrl, function(data) {
    allEventData = data.features;
    updateMap('all');  // initial load
    updateChart(allEventData, 'all');
    updateTotalEvents(allEventData, 'all');
});

document.getElementById('yearFilter').addEventListener('change', function () {
    const year = this.value;
    updateMap(year);
    updateChart(allEventData, year);
    updateTotalEvents(allEventData, year);
});
