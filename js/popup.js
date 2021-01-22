document.addEventListener('DOMContentLoaded', function () {

    let generateButton = document.getElementById("generate")
    generateButton.addEventListener('click', generate, false)

    let copyButton = document.getElementById("copy");
    copyButton.addEventListener('click', copy, false)

    function generate() {
        chrome.tabs.query({ currentWindow: true, active: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'generate', displayLocators)
            })
    }

    function copy() {
        /* Get the text field */
        var copyText = document.getElementById("output");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand("copy");
    }

    function displayLocators(response) {
        let div = document.getElementById('output');
        let respArr = response.locators.split("##");
        console.log(respArr)
        div.textContent = "";
        output = ""
        respArr.forEach(function (currentValue) {
            output += currentValue
        });
        div.innerHTML = output
    }

}, false)


