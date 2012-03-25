function RTM (api_key, api_secret) {
    this.api_key = api_key;
    this.api_secret = api_secret;
}

RTM.prototype.authenticate = function() {
    
} 

/**
* @param params: the parameters other than the api_sig in form of a dictionary {param-name:param-value}
*/
RTM.prototype.formURL = function(serviceURL, params) {
    hadAPIkey = true;
    if ("api_key" in params) { 
        params["api_key"] = this.api_key;
        hadAPIkey = false;
    }
    param_names = keys(params).sort();
    
    sig = "" + api_secret;
    for (param_name in param_names) {
        sig += param_name + param_names[param_name]
    }
    sig = hex_md5(sig);

    url = serviceURL;
    for (param_name in param_names) {
        url += param_name "=" + params[param_name] + "&";
    }
    url += "api_sig=" + sig;

    if (!hadAPIkey) delete params["api_key"];
    
    return url;
}
