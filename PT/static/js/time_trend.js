let chartInstance = null;
let eventLayer = L.geoJson(null, {
    pointToLayer: (feature, latlng) => L.marker(latlng),
    onEachFeature: (feature, layer) => {
        layer.bindPopup(`<b>${feature.properties.event_id_cnty}</b><br>${feature.properties.notes}`);
    }
});

// Fetch data once from the API
$.getJSON(conflictDataUrl, function(data) {
    allEventData = data.features;
    updateMap('all');  // initial load
    updateChart(allEventData, 'all');
});

// Dropdown filter listener
document.getElementById('yearFilter').addEventListener('change', function () {
    const year = this.value;
    updateMap(year);
    updateChart(allEventData, year);
});

// Update map with filtered events
function updateMap(selectedYear) {
    const filteredFeatures = allEventData.filter(feature => {
        const year = new Date(feature.properties.event_date).getFullYear();
        return selectedYear === 'all' || year == selectedYear;
    });

    eventLayer.clearLayers();
    eventLayer.addData(filteredFeatures);
    eventLayer.addTo(map);
}

// Count events per month for selected year
function getMonthlyCounts(features, year) {
    const counts = Array(12).fill(0);
    features.forEach(feature => {
        const date = new Date(feature.properties.event_date);
        if (year === 'all' || date.getFullYear() == year) {
            counts[date.getMonth()] += 1;
        }
    });
    return counts;
}

// Update or create Chart.js instance
function updateChart(features, selectedYear) {
    const monthlyCounts = getMonthlyCounts(features, selectedYear);
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const chartData = {
        labels: labels,
        datasets: [{
            label: `Conflict Events in ${selectedYear === 'all' ? '2020–2024' : selectedYear}`,
            data: monthlyCounts,
            backgroundColor: 'rgba(41, 129, 245, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
        }]
    };

    if (chartInstance) {
        chartInstance.data = chartData;
        chartInstance.update();
    } else {
        const ctx = document.getElementById('eventChart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Events'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
    }
}
