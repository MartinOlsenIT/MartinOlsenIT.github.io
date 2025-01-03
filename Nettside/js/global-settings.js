// Load preferences from localStorage
function loadPreferences() {
    const savedColor3 = localStorage.getItem("color3") || "#000000"; // Default color
    const savedFontSize = localStorage.getItem("fontsize") || "16"; // Default font size

    // Validate the saved color
    const isValidColor = /^#[0-9A-F]{6}$/i.test(savedColor3);
    const backgroundColor = isValidColor ? savedColor3 : "#000000"; // Fallback to black if invalid

    // Apply the saved background color
    document.body.style.backgroundColor = backgroundColor;

    const textElements = document.querySelectorAll("h2, p, button"); // Add more elements if needed
    textElements.forEach((element) => {
        element.style.fontSize = savedFontSize + "px";
    });
}

window.addEventListener("load", loadPreferences);