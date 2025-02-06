const vscode = acquireVsCodeApi();

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        vscode.postMessage({
            "id": this.id,
            "ipynbpath": this.dataset.ipynbpath
        });
    });
});
