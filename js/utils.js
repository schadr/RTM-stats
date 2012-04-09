keys = function(dict) {
  var keys = new Array();
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

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
