function rot13(string) {
  var capitalBounds = [65, 90];
  var lowerBounds = [97, 122];
  var result = '';
  var finalCode, encoding;

  for (var i = 0; i < string.length; i++) {
    finalCode = '';
    encoding = string[i].charCodeAt(0);

    if (withinBounds(encoding, capitalBounds)) {
      finalCode = applyCypher(encoding, capitalBounds);
    } else if (withinBounds(encoding, lowerBounds)) {
      finalCode = applyCypher(encoding, lowerBounds);
    } else {
      finalCode = encoding;
    }

    result += String.fromCharCode(finalCode);
  }

  return result;
}

function applyCypher(encoding, bounds) {
  var candidate = encoding + 13;
  if (withinBounds(candidate, bounds)) {
    return candidate;
  } else {
    return encoding - 13;
  }
}

function withinBounds(num, bounds) {
  return (num >= bounds[0] && num <= bounds[1]);
}
