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

    let outputString = tag + ': ';

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
        return outputString + "##";
    }
}

function generateLocators() {
    let output = ''
    let elementz = document.querySelectorAll("a,button,input,select");
    elementz.forEach(function(currentValue){
        output += generateLocator(currentValue) + '\n'
    });
    return output.replaceAll('undefined', '');
}

//Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    sendResponse({locators: generateLocators()})
    // fix async response issue 
    // in case you're curious about this: 
    // https://stackoverflow.com/questions/54126343/how-to-fix-unchecked-runtime-lasterror-the-message-port-closed-before-a-respon
    return true;
});