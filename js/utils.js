keys = function(dict) {
    var keys = [];

    for(var key in dict) {
        keys.push(key);
    }

    return keys;
}

/**
* from http://papermashup.com/read-url-get-variables-withjavascript/
*/
getUrlVars = function() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

