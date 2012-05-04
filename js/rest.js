GET = function(url, params, async) {
  if (params == null) params = new Array();
  if ("url" in params) 
    throw "rest.js - GET: url param defined";
  if ("verb" in params)
    throw "rest.js - GET: verb param defined";
  var xmlhttp = new XMLHttpRequest();
  params["url"] = encodeURIComponent(url);
  params["verb"] = "GET";
  var c_url = combineUrlVars("php/rest.php",params);
  xmlhttp.open("GET", c_url, async);
  delete params["url"];
  delete params["verb"];

  xmlhttp.send();

  response = makeStruct("status xml");
  return new response(xmlhttp.status, xmlhttp.response);
}

POST = function(url, params, content, async) {
  var xmlhttp = new XMLHttpRequest();
  if (params == null) params = new Array();
  if ("url" in params)
    throw "rest.js - POST: url param defined";
  if ("verb" in params)
    throw "rest.js - POST: verb param defined";
  if ("content" in params)
    throw "rest.js - POST: content param defined";
  params["url"] = encodeURIComponent(url);
  params["verb"] = "POST";
  params["content"] = content;
  xmlhttp.open("GET", combineUrlVars("php/rest.php",params), async);
  delete params["url"];
  delete params["verb"];
  delete params["content"];

  xmlhttp.send();

  response = makeStruct("status xml");
  return new response(xmlhttp.status, xmlhttp.response);
}

combineUrlVars = function(url, params) {
  var key_set = keys(params);
  if (key_set.length == 0) return url;

  var c_url = url;
  var i = 0;
  var count = key_set.length;

  if (url.indexOf("?") == -1) {
    c_url = c_url + "?" + key_set[0] + "=" + params[key_set[0]];
    i = 1;
  }
  for (; i < count; i++) {
    c_url = c_url + "&" + key_set[i] + "=" + params[key_set[i]];
  }

  return c_url;
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
