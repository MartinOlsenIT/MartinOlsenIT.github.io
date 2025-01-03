function savePreferences() {
  const color3 = document.getElementById("color3").value;
  const fontsize = document.getElementById("fontsize").value;

  localStorage.setItem("color3", color3);
  localStorage.setItem("fontsize", fontsize);

  alert("Settings saved!");
}

// Apply preferences immediately without saving
function applyPreferences() {
  const color3 = document.getElementById("color3").value;
  const fontsize = document.getElementById("fontsize").value;

  // Apply styles dynamically
  document.documentElement.style.setProperty("--background-color", color3);
  document.documentElement.style.setProperty("--font-size", fontsize + "px");

  document.getElementById("fontsize-value").textContent = fontsize + "px";
}

// Load preferences on page load
function loadPreferences() {
  const savedColor3 = localStorage.getItem("color3") || "#000000";
  const savedFontSize = localStorage.getItem("fontsize") || "16";

  // Apply saved preferences
  document.documentElement.style.setProperty("--background-color", savedColor3);
  document.documentElement.style.setProperty("--font-size", savedFontSize + "px");

  // Reflect saved values in the inputs
  document.getElementById("color3").value = savedColor3;
  document.getElementById("fontsize").value = savedFontSize;
  document.getElementById("fontsize-value").textContent = savedFontSize + "px";
}

// Reset preferences to default
function resetPreferences() {
  // Reset to default values
  localStorage.removeItem("color3");
  localStorage.removeItem("fontsize");

  loadPreferences(); // Reload default values

  alert("Settings reset to default!");
}

// Event listeners
document.getElementById("save-settings").addEventListener("click", savePreferences);
document.getElementById("reset-settings").addEventListener("click", resetPreferences);
document.getElementById("color3").addEventListener("input", applyPreferences);
document.getElementById("fontsize").addEventListener("input", applyPreferences);

// Load preferences when the page loads
window.addEventListener("load", loadPreferences);