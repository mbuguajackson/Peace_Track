function updateTotalFatalities(features, selectedYear) {
    const totalFatalities = features.reduce((sum, feature) => {
        const year = new Date(feature.properties.event_date).getFullYear();
        if (selectedYear === 'all' || year == selectedYear) {
            return sum + (parseInt(feature.properties.fatalities) || 0);
        }
        return sum;
    }, 0);

    document.getElementById('total-fatalities-count').textContent = totalFatalities;
}

$.getJSON(conflictDataUrl, function(data) {
    allEventData = data.features;
    updateMap('all');
    updateChart(allEventData, 'all');
    updateTotalEvents(allEventData, 'all');
    updateTotalFatalities(allEventData, 'all'); // add this
});

document.getElementById('yearFilter').addEventListener('change', function () {
    const year = this.value;
    updateMap(year);
    updateChart(allEventData, year);
    updateTotalEvents(allEventData, year);
    updateTotalFatalities(allEventData, year); // add this
});
