getCookieValue = function(c_name) {
  return getCookies()[c_name];
}

setCookie = function(c_name, c_value, expires_in_days) {
  var expiry_date = new Date();
  expiry_date.setTime(expiry_date.getTime() + expires_in_days*24*60*60*1000);
  var c_value = escape(c_value) + ((expires_in_days==null) ? "" : "; expires=" + expiry_date.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

getCookies = function() {
  var cookies = document.cookie.split(";");
  var r_cookies = new Array();
  for (var i = 0; i < cookies.length; i++) {
    var cookie_name = cookies[i].substr(0, cookies[i].indexOf("="));
    cookie_name = cookie_name.replace(/^\s+|\s+$/g,"");
    var cookie_value = unescape(cookies[i].substr(cookies[i].indexOf("=")+1));
    r_cookies[cookie_name] = cookie_value;
  }
  return r_cookies;
}

removeCookie = function(c_name) {
  // to delete a cookie just set its expiration date before today
  setCookie(c_name, "", -1);
}

clearCookies = function() {
  var cookies = getCookies();
  for (var cookie_name in cookies) {
    removeCookie(cookie_name);
  }
}

updateCookie = function(c_name, c_value, expires_in_days) {
  setCookie(c_name, c_value, expires_in_days)
}

hasCookie = function(c_name) {
  return c_name in getCookies();
}
