/*
For now all the board is is an array of arrays. Eventually it will have to handle more complicated tasks like automatically removing peices when they are captured.

empty => the symbol representing an empty board space.
*/

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
    var empty = 0;
    return new Array(number).fill(empty);
  }
}
