// Save preferences to localStorage
function savePreferences() {
  const color3 = document.getElementById("color3").value;
  const fontsize = document.getElementById("fontsize").value;

  // Save preferences to localStorage
  localStorage.setItem("color3", color3);
  localStorage.setItem("fontsize", fontsize);

  // Notify the user
  alert("Innstillinger lagret!");
}

// Apply preferences immediately without saving
function applyPreferences() {
  const color3 = document.getElementById("color3").value;
  const fontsize = document.getElementById("fontsize").value;

  // Apply styles using CSS variables
  document.documentElement.style.setProperty("--background-color", color3);
  document.documentElement.style.setProperty("--font-size", fontsize + "px");

  // Update font size display
  document.getElementById("fontsize-value").textContent = fontsize + "px";
}

// Load saved preferences on page load
function loadPreferences() {
  const savedColor3 = localStorage.getItem("color3") || "#f5f5f5";
  const savedFontSize = localStorage.getItem("fontsize") || "16";

  // Apply saved preferences
  document.getElementById("color3").value = savedColor3;
  document.getElementById("fontsize").value = savedFontSize;

  // Apply styles using CSS variables
  document.documentElement.style.setProperty("--background-color", savedColor3);
  document.documentElement.style.setProperty("--font-size", savedFontSize + "px");

  // Update font size display
  document.getElementById("fontsize-value").textContent = savedFontSize + "px";
}

// Event listeners
document.getElementById("save-settings").addEventListener("click", savePreferences);
document.getElementById("color3").addEventListener("input", applyPreferences);
document.getElementById("fontsize").addEventListener("input", applyPreferences);

// Load preferences when the page is loaded
window.addEventListener("load", loadPreferences);
