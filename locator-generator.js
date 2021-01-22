
elementz = $('a, input, button');

elementz.each(function(){
    console.log(this.tagName);
    id = ''
    className = ''
    href = ''
    linktext = ''

    if(this.id != ''){
        id = this.id;
    }

    if(this.href != '' && typeof this.href !== 'undefined'){
        href = this.href;
    }

    if(this.className != '' && typeof this.className !== 'undefined'){
        className = this.className;
    }

    if(this.text != '' && typeof this.text !== 'undefined'){
        linktext = this.text.trim()
    }

    console.log(this.tagName + ': ' + id + '/' + className + '/' + href + '/' + linktext)
});