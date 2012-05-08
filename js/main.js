load = function() {
  // using the desktop api authentication
  setCookie("frob","",-1);
  var rtm = new RTM();
  var frob = rtm.getFrob();
  window.document.write("frob before: " + frob + "<br></br>");
  rtm.authenticate(frob, afterAuthentication);
}

afterAuthentication = function(frob) {
  var rtm = new RTM();
  var frob = rtm.getFrob();
  window.document.write("frob after: " + frob + "<br></br>");
  var auth_token = rtm.getAuthToken(frob);
  window.document.write("auth token: " + auth_token + "<br></br>");
}
