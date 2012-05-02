load = function() {
  var rtm = new RTM();
  rtm.loginUsingCooky();
  if (!rtm.isLoggedIn()) {
    rtm.login();
  }
  if (!rtm.isAuthenticated()) {
    rtm.authenticate();
  }
  var frob = rtm.getFrob();
}

auth = function() {
  rtm = new RTM();
  var url = rtm.getAuthenticationURL();
  xmlhttp = new XMLHttpRequest();

//  window.location = rtm.getAuthenticationURL();
}
