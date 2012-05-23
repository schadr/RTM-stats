load = function() {
  // using the desktop api authentication
  setCookie("frob","",-1);
  var rtm = new RTM();
  var frob = rtm.getFrob();
  console.log("frob before: " + frob + "<br></br>");
  rtm.authenticate(frob, afterAuthentication);
}

afterAuthentication = function(frob) {
  var rtm = new RTM();
  var frob = rtm.getFrob();
  console.log("frob after: " + frob + "<br></br>");
  var auth_token = rtm.getAuthToken(frob);
  console.log("auth token: " + auth_token + "<br></br>");
}
