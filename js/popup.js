document.addEventListener('DOMContentLoaded', function () {
    
    let generateButton = document.getElementById("generate")
    generateButton.addEventListener('click', onclick, false)

    function onclick() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'generate');
            });
    }
}, false)