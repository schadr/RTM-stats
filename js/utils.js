keys = function(dict) {
    var keys = [];

    for(var key in dict) {
        keys.push(key);
    }

    return keys;
}
