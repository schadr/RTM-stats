load = function() {
  // check for cookies
  // TODO for later
  // check for callback
  if ("frob" in getUrlVars()) {
    var frob = getUrlVars()["frob"];
    // TODO grab the actual data
  }
  // leave default page
}

auth = function() {
  rtm = new RTM();
  window.location = rtm.getAuthenticationURL();
}
