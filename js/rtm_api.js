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
    var params = {"method": "rtm.auth.getFrob"};
    var url = this.formURL(service_url, params);
    var result = GET(url, null, false);
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(result.xml,"text/xml");

    frob = xmlDoc.getElementsByTagName("frob").item(0).firstChild.nodeValue;
    setCookie("frob",frob,1);
  }
  return frob;
}

RTM.prototype.isCookieAuthTokenValid = function() {
  if (!hasCookie("auth_token")) return false;
  var service_url = "http://api.rememberthemilk.com/services/rest/";
  var params = {"method":"rtm.auth.checkToken","auth_token":getCookieValue("auth_token")};
  var url = this.formURL(service_url, params);
  var result = GET(url, null, false);
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(result.xml,"text/xml");

  var err_tags = xmlDoc.getElementsByTagName("err");

  return err_tags.length != 0;
}

RTM.prototype.getAuthToken = function(frob) {
  if (frob == null || frob == undefined) throw "ERROR: RTM.getToken(frob) - no frob given";
  if (this.isCookieAuthTokenValid()) return getCookieValue("auth_token");

  var service_url = "http://api.rememberthemilk.com/services/rest/";
  var params = {"method":"rtm.auth.getToken","frob":frob};
  var url = this.formURL(service_url, params);
  var result = GET(url, null, false);
  console.log(result.xml);
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(result.xml,"text/xml");
  
  var token = xmlDoc.getElementsByTagName("token").item(0).firstChild.nodeValue;
  setCookie("auth_token",token,1);
  return token;
}
