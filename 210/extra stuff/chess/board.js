function makeBoard(size) {
  return createSquares(size)

  function createSquares(number) {
    var whole = new Array(number);
    for (var i = 0; i < whole.length; i++) {
      whole[i] = makeRow(number);
    }
    return whole;
  }

  function makeRow(number) {
    return new Array(number).fill(0);
  }
}
