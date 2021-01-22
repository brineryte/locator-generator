function generateLocatorFromId(id) {
    return "Locator(\"" + id + "\") | ";
}

function generateLocatorFromClassName(className) {
    return "ClassLocator(\"" + className + "\") | ";
}

function generateLocatorFromHref(href) {
    return "HrefLocator(\"" + href + "\") | ";
}

function generateLocatorFromLinkText(linktext) {
    return "LinkTextLocator(\"" + linktext + "\") | ";
}

function generateLocator(item) {
    let tag = item.tagName;
    let linktext = '';

    outputString = tag + ': ';

    if (item.id != '') {
        outputString += generateLocatorFromId(item.id);
    }

    if (item.tagName == 'A' && item.text != '' && typeof item.text !== 'undefined') {
        linktext = item.text.trim().replaceAll('\n', '').replaceAll('\t', '').replaceAll('\r', '').replaceAll(' ', '');
        outputString += generateLocatorFromLinkText(linktext.trim());
    }

    if (item.className != '' && typeof item.className !== 'undefined') {
        outputString += generateLocatorFromClassName(item.className)
    }

    if (item.href != '' && typeof item.href !== 'undefined') {
        outputString += generateLocatorFromHref(item.href)
    }

    if (outputString != tag + ': ') {
        return outputString;
    }
}

function generateLocators() {
    output = ''
    elementz = document.querySelectorAll("a,button,input,select");
    elementz.forEach(function(currentValue){
        output += generateLocator(currentValue) + '\n'
    });
    console.log(output);
}

function callGenerateOnTabDOM(){
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendRequest(tab.id, {action: "getDOM"}, function(response){
            console.log(response.dom);
        })
    })
}

chrome.runtime.onMessage.addListener(function(request){
    alert(request);
});