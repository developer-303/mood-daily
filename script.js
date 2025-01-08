const moodData = [];
const moodChartElement = document.getElementById("moodChart");
const affirmationText = document.getElementById("affirmationText");

let moodChart;

// Toggle Dark Mode
document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Log Mood
document.getElementById("logMood").addEventListener("click", () => {
  const mood = document.querySelector('input[name="mood"]:checked');
  const thoughts = document.getElementById("thoughts").value;

  if (!mood) {
    alert("Please select a mood!");
    return;
  }

  const moodEntry = {
    date: new Date().toLocaleString(),
    mood: mood.value,
    thoughts,
  };

  moodData.push(moodEntry);
  alert("Mood logged successfully!");
  updateChart();
  showAffirmation(mood.value);
});

// Reset Data
document.getElementById("resetData").addEventListener("click", () => {
  moodData.length = 0;
  updateChart();
  alert("All data has been reset!");
});

// Export Data
document.getElementById("exportData").addEventListener("click", () => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    moodData.map((row) => `${row.date},${row.mood},${row.thoughts}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "mood_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Update Chart
function updateChart() {
  const moodCounts = {
    happy: 0,
    neutral: 0,
    sad: 0,
    angry: 0,
    anxious: 0,
  };

  moodData.forEach((entry) => {
    moodCounts[entry.mood]++;
  });

  const chartData = {
    labels: Object.keys(moodCounts),
    datasets: [
      {
        label: "Mood Distribution",
        data: Object.values(moodCounts),
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#F44336", "#9C27B0"],
      },
    ],
  };

  if (moodChart) moodChart.destroy();

  moodChart = new Chart(moodChartElement, {
    type: "bar",
    data: chartData,
  });
}

// Show Affirmation
function showAffirmation(mood) {
  const affirmations = {
    happy: "Keep spreading your positivity!",
    neutral: "A steady mind is a strong mind.",
    sad: "This too shall pass. Take care of yourself.",
    angry: "Breathe deeply and let go of the tension.",
    anxious: "You are stronger than your fears.",
  };

  affirmationText.textContent = affirmations[mood];
}
