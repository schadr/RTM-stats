function RTM() {
    this.api_key = "42af200895280c26d736e11b9a02b7da";
}

/**
* @param params: the parameters other than the api_sig in form of a dictionary {param-name:param-value}
*/
RTM.prototype.formURL = function(serviceURL, params) {
    hadAPIkey = true;
    if (!("api_key" in params)) { 
        params["api_key"] = this.api_key;
        hadAPIkey = false;
    }
    param_names = keys(params).sort();
    sig = "";
    for (i = 0; i < param_names.length; i = i + 1) {
        sig = sig + param_names[i] + params[param_names[i]];
    }
    sig = this.sign(sig);
    url = serviceURL + "?";
    for (i = 0; i < param_names.length; i = i + 1) {
        url = url + param_names[i] + "=" + params[param_names[i]] + "&";
    }
    url = url + "api_sig=" + sig;

    if (!hadAPIkey) delete params["api_key"];
    
    return url;
}

RTM.prototype.sign = function(payload) {
  var http = new XMLHttpRequest();
  http.open("GET", "php/sign.php?payload="+payload, false);
  http.send();
  return trim(http.responseText);
}

RTM.prototype.getAuthenticationURL = function(frob) {
  var base_url = "http://www.rememberthemilk.com/services/auth/";
  var params = {"perms":"delete","frob":frob};
  return this.formURL(base_url, params);
}

RTM.prototype.authenticate = function(frob, callback) {
  var auth_url = this.getAuthenticationURL(frob);
  var auth_window = window.open("php/authwindow.php?url=" + encodeURIComponent(auth_url));
  auth_window.addEventListener('unload', callback, true);
}

RTM.prototype.getFrob = function() {
  var frob = "";
  if (hasCookie("frob")) {
    frob = getCookieValue("frob");
  } else {
    var service_url = "http://api.rememberthemilk.com/services/rest/";
    var params = new Array();
    params["method"] = "rtm.auth.getFrob";
    var url = this.formURL(service_url, params);
    var result = GET(url, null, false);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(result.xml,"text/xml");

    frob = xmlDoc.getElementsByTagName("frob").item(0).firstChild.nodeValue;
    setCookie("frob",frob,1);
  }
  return frob;
}
