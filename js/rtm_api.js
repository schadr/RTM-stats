function RTM () {
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

RTM.prototype.getAuthenticationURL = function() {
  var base_url = "http://www.rememberthemilk.com/services/auth/";
  var params = {"perms":"delete"};
  return this.formURL(base_url, params);
}

RTM.prototype.loginUsingCooky = function() {
}

RTM.prototype.isLoggedIn = function() {
  return false;
}

RTM.prototype.login = function() {
}

RTM.prototype.isAuthenticated = function() {
  return false;
}

RTM.prototype.authenticate = function() {
}

RTM.prototype.getFrob = function() {
  return "";
}
