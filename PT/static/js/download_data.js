const conflictDataUrl = "{% url 'conflict_data_api' %}";

// Convert features array to CSV string
function featuresToCSV(features) {
  if (!features.length) return '';
  const headers = Object.keys(features[0].properties);
  const rows = [headers.join(',')];
  features.forEach(f => {
    const vals = headers.map(h => {
      let v = f.properties[h];
      if (v === null || v === undefined) v = '';
      if (typeof v === 'string') v = `"${v.replace(/"/g, '""')}"`;
      return v;
    });
    rows.push(vals.join(','));
  });
  return rows.join('\n');
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function fetchFeatures() {
  try {
    const res = await fetch(conflictDataUrl);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.type === "FeatureCollection" && Array.isArray(data.features)) {
      return data.features;
    }
    throw new Error("Unexpected data format from API");
  } catch (error) {
    alert("Failed to load data: " + error.message);
    return null;
  }
}

document.getElementById('download-csv').addEventListener('click', async () => {
  const features = await fetchFeatures();
  if (!features) return;
  const csv = featuresToCSV(features);
  downloadFile('conflict_data.csv', csv, 'text/csv');
});

document.getElementById('download-geojson').addEventListener('click', async () => {
  const features = await fetchFeatures();
  if (!features) return;
  const geojsonStr = JSON.stringify({ type: "FeatureCollection", features }, null, 2);
  downloadFile('conflict_data.geojson', geojsonStr, 'application/geo+json');
});

document.getElementById('share-link').addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => alert("Link copied to clipboard!"))
    .catch(() => alert("Failed to copy link."));
});
