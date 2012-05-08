load = function() {
  // using the desktop api authentication
  var rtm = new RTM();
  var frob = rtm.getFrob();
  window.document.write("frob before: " + frob + "<br></br>");
  rtm.authenticate(frob, afterAuthentication);
}

afterAuthentication = function(frob) {
  var rtm = new RTM();
  var frob = rtm.getFrob();
  window.document.write("frob after: " + frob + "<br></br>");
}
