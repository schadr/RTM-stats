GET = function(url, params, async=False) {
  xmlhttp = XMLHttpRequest();
  if ("url" in params) 
    throw "rest.js - GET: url param defined";
  if ("verb" in params)
    throw "rest.js - GET: verb param defined";
  params["url"] = url;
  params["verb"] = "GET";
  xmlhttp.open("GET", combineUrlVars("php/rest.php",params), async);
  delete params["url"];
  delete params["verb"];

  xmlhttp.send();

  response = makeStruct("status xml");
  return response(xmlhttp.status.xmlhttp.responseXML);
}

POST = function(url, parameters, content, async=False) {
  xmlhttp = XMLHttpRequest();
  if ("url" in params)
    throw "rest.js - POST: url param defined";
  if ("verb" in params)
    throw "rest.js - POST: verb param defined";
  if ("content" in params)
    throw "rest.js - POST: content param defined";
  params["url"] = url;
  params["verb"] = "POST";
  params["content"] = content;
  xmlhttp.open("GET", combineUrlVars("",params), async);
  delete params["url"];
  delete params["verb"];
  delete params["content"];

  xmlhttp.send();

  response = makeStruct("status xml");
  return response(xmlhttp.status,xmlhttp.responseXML);
}

combineUrlVars = function(url, params) {
  if (params.length == 0) return url;

  c_url = url;
  i = 0;
  key_set = keys(params);
  count = key_set.length;

  if (url.indexOf("?") != -1) {
    c_url = c_url + "?" + key_set[0] + "=" + params[key_set[0]];
    i = 1;
  }
  for (var i = 0; i < count; i++) {
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
