function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }

}

function insertAfter(newElement, targetElement) {
    var parentElement = targetElement.parentNode;
    if (parentElement.lastChild == targetElement) {
        parentElement.appendChild(newElement);
    } else {
        parentElement.insertBefore(newElement,targetElement.nextSibling);
    }

}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute('title') : "";     
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3) {
           description.childNodes[0].nodeValue = text;
        }
    }
    return true;
}

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imageGallery")) return false;

    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.jpg");
    placeholder.setAttribute("width", "500");
    placeholder.setAttribute("height","300");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("choose an image");
    description.appendChild(desctext);

    var gallery = document.getElementById("imageGallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imageGallery")) return false;
    var gallery = document.getElementById("imageGallery");
    var links = gallery.getElementsByTagName('a');
    for(var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            return !showPic(this);
        }
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
//window.onload=countBodyChildren;
//window.open(,"pop","width=320,height=480");