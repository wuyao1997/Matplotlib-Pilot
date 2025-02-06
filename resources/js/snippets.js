
const vscode = acquireVsCodeApi();

document.getElementById('sidebarToggle').checked = true;
const toggleSwitch = document.getElementById('sidebarToggle');
toggleSwitch.addEventListener('change', function () {
    const slider = this.nextElementSibling;
    if (this.checked) {
        vscode.postMessage({
            "id": "toggleBar",
            "native": false
        });
    } else {
        vscode.postMessage({
            "id": "toggleBar",
            "native": true
        });
    }
});

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        vscode.postMessage({
            "id": this.id,
            "snippets": this.dataset.snippets,
            "event": "click"
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('color');
    const colorValueDisplay = document.getElementById('colorValue');

    colorPicker.addEventListener('input', function (event) {
        const newColor = event.target.value;
        colorValueDisplay.textContent = newColor;
    });

    colorPicker.addEventListener('blur', function () {
        copyColorValue();
    });
});

function copyColorValue() {
    const colorValueDisplay = document.getElementById('colorValue');
    const colorValue = colorValueDisplay.textContent.trim();
    navigator.clipboard.writeText(colorValue);
}

