// Load preferences from localStorage
function loadPreferences() {
    const savedColor3 = localStorage.getItem("color3") || "#f5f5f5"; // Default color
    const savedFontSize = localStorage.getItem("fontsize") || "16"; // Default font size

    // Apply the saved background color
    document.body.style.backgroundColor = savedColor3;

    // Apply the saved font size globally (for all text elements)
    const textElements = document.querySelectorAll("body, h1, p, button"); // Add more elements if needed
    textElements.forEach((element) => {
        element.style.fontSize = savedFontSize + "px";
    });
}

// Apply the preferences when the page is loaded
window.addEventListener("load", loadPreferences);
