load = function() {
  // using the desktop api authentication
  var rtm = new RTM();
  var frob = rtm.getFrob();
  rtm.authenticate(frob, afterAuthentication);
}

afterAuthentication = function(frob) {
  var rtm = new RTM();
  var frob = rtm.getFrob();
  window.document.write("success\n");
}
