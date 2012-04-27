keys = function(dict) {
  var keys = new Array();
  for(var key in dict) {
    keys.push(key);
  }
  return keys;
}

function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}
