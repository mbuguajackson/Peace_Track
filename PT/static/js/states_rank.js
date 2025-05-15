function getTopStatesData(features, year) {
    const stateCounts = {};

    features.forEach(feature => {
        const date = new Date(feature.properties.event_date);
        if (year === 'all' || date.getFullYear() == year) {
            const state = feature.properties.admin1 || 'Unknown';
            stateCounts[state] = (stateCounts[state] || 0) + 1;
        }
    });

    // Convert to array and sort by count
    const sorted = Object.entries(stateCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // top 10 states

    return {
        labels: sorted.map(item => item[0]),
        counts: sorted.map(item => item[1])
    };
}


let topStatesChartInstance = null;

function updateTopStatesChart(features, selectedYear) {
    const { labels, counts } = getTopStatesData(features, selectedYear);

    const chartData = {
        labels: labels,
        datasets: [{
            label: `Top States in ${selectedYear === 'all' ? '2020–2024' : selectedYear}`,
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const ctx = document.getElementById('topStatesChart').getContext('2d');

    if (topStatesChartInstance) {
        topStatesChartInstance.data = chartData;
        topStatesChartInstance.update();
    } else {
        topStatesChartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Event Count' }
                    },
                    x: {
                        title: { display: true, text: 'State' }
                    }
                }
            }
        });
    }
}

document.getElementById('yearFilter').addEventListener('change', function () {
    const selectedYear = this.value;
    updateChart(allEventData, selectedYear);         // update time trend
    updateTopStatesChart(allEventData, selectedYear); // update top states
});


$.getJSON(conflictDataUrl, function(data) {
    allEventData = data.features;
    updateChart(allEventData, 'all');
    updateTopStatesChart(allEventData, 'all');
});
