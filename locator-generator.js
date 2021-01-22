
function generateLoctorFromId(id){
    return "Locator(\"" + id + "\") | ";
}

function generateLocatorFromClassName(className){
    return "ClassLocator(\"" + className + "\") | ";
}

function generateLocatorFromHref(href){
    return "HrefLocator(\"" + href + "\") | ";
}

function generateLocatorFromLinkText(linktext){
    return "LinkTextLocator(\"" + linktext + "\") | ";
}

elementz = $('a, input, button, select');

elementz.each(function(){
    let tag = this.tagName;
    let linktext = '';

    outputString = tag + ': ';

    if(this.id != ''){
        outputString += generateLoctorFromId(this.id);
    }

    if(this.tagName == 'A' && this.text != '' && typeof this.text !== 'undefined'){
        linktext = this.text.trim().replaceAll('\n', '').replaceAll('\t', '').replaceAll('\r', '').replaceAll(' ', '');
        outputString += generateLocatorFromLinkText(linktext.trim());
    }
    
    if(this.className != '' && typeof this.className !== 'undefined'){
        outputString += generateLocatorFromClassName(this.className)
    }

    if(this.href != '' && typeof this.href !== 'undefined'){
        outputString += generateLocatorFromHref(this.href)
    }

    if(outputString != tag + ': '){
        console.log(outputString);
    }
});