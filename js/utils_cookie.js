getCookieValue = function(c_name) {
  return getCookies[c_name];
}

setCookie = function(c_name_value, expires_in_days) {
  var expiry_date = new Date();
  expiry_date.setDate(expiry_date.getDate() + expires_in_days);
  var cookie = "";
  if (expires_in_days != null) cookie = cookie + "expires=" + expiry_date.toUTCString();
  var cookie_names = keys(c_name_value);
  for (var cookie_name in cookie_names) {
    var cookie_value = c_name_value[cookie_name];
    cookie = cookie + ";" + cookie_name + "=" + escape(cookie_value);
  }
  document.cookie = cookie;
}

getCookies = function() {
  var cookies = document.cookie.split(";");
  var r_cookies = new Array();
  for (var i = 0; i < cookies.length; i++) {
    var cookie_name = cookies[i].substr(0, cookies[i].indexOf("="));
    cookie_name = cookie_name.replace(/^\s+|\s+$/g,"");
    var cookie_value = cookies[i].substr(cookies[i].indecOf("=")+1);
    r_cookies[cookie_name] = unescape(cookie_value);
  }
  return r_cookies;
}

isCookieExpired = function() {
  var str_expiry_date = getCookies["expires"];
  if (str_expiry_date == null || str_expiry_date == undefined) return false; 
  var expiry_date = new Date(str_expiry_date);
  var current_date = new Date();
  return current_date > expiry_date;
}

clearCookies = function() {
  document.cookies = null;
}
