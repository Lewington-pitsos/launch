 // -----------------------------------------------------------------

var BASE_SYMBOL = 1;
var SAFE_BLACK = 'B';
var SAFE_WHITE = 'W';
var DANGER_BLACK = 'b';
var DANGER_WHITE = 'w';
var EMPTY = '_';

var WHITE = 'X';
var BLACK = "O";

var SAFE = {
  'X': SAFE_WHITE,
  'O': SAFE_BLACK
}

var DANGER = {
  'X': DANGER_WHITE,
  'O': DANGER_BLACK
}

/*
input:
  - ingiger representing board width/height

keeps track of:
  - the scores of both players
  - the board
  - is able to process the board at the end of each round (remove captured peices and update the score accordingly)

process algotithem:
  - make a temporary board for storing the status of each token (data)
  - for every square on the board, check if it contains a token
    - if so, check whether the token is neighbouring any empty squares, or any
      tokens we already know are safe
      - if not, mark the token as unsafe on data
      - if so, mark it as safe in data, and if any of the neighbouring data
        tokens are currently friendly and unsafe, recursively mark them as safe
        too

  - once this process is complete, all the safe tokens have been marked as safe
    so now we remove all the tokens from board still marked as unsafe in data.
    - each time we remove a token, we add 1 to the appripriate player's score.



*/
 function Board(n, base) {
  // ------------------------------------------ Properties--------
   this.state = makeBoard(n, base);
   this.size = n;
   this.blackScore = 0;
   this.whiteScore = 0;

   this.process = function() {
     var data = makeBoard(this.size, 0); // a temporary board for recording
                                         // token saftey
     board = this.state;
     // iterate through every element in every row in board
     board.forEach(function(row, rowIndex) {
       row.forEach(function(square, squareIndex) {
         if (square !== BASE_SYMBOL) {
           // if the element represents an empty square we ignore it.
           var neighbourTokens = findNeighbours(addTokenTo, rowIndex, squareIndex, board, data);
           var status = checkSafe(neighbourTokens, square);
           data[rowIndex][squareIndex] = status;
           if (status === status.toUpperCase()) {
             trySave(rowIndex, squareIndex, square, data) // i.e. if square is safe, recursively mark all neighbouring, unsafe tokens as safe
           }
         }
       })

     });

     // now we just remove all unsafe tokens from the board and update scores
     // accordingly
     data.forEach(function(row, rowIndex) {
       row.forEach(function(square, squareIndex) {
         if (square === 'b' || square == 'w') {
           board[rowIndex][squareIndex] = BASE_SYMBOL;
           if (square === 'b') {
             this.whiteScore++;
           } else {
             this.blackScore++;
           }
         }
       })
     })

     return this;
   }


   // ------------------------------------------ Private Functions--------


   function makeBoard(n, base) {
     // creates a n x n board with base as the placeholder element
     var x = new Array(n).fill(0).map(_ => Array(n).fill(base));
     return x;
   }

   /*

   craetes a new array containing information concerning the surrounding board squares. Exactly what information is determined by the function passed in.

   */

   function findNeighbours(addMethod, rowIndex, squareIndex, board, data) {
     var neighbours = [];
     addMethod(neighbours, rowIndex, squareIndex + 1, board, data);
     addMethod(neighbours, rowIndex, squareIndex - 1, board, data);
     addMethod(neighbours, rowIndex + 1, squareIndex, board, data);
     addMethod(neighbours, rowIndex - 1, squareIndex, board, data);


     return neighbours;
   }

     /*

       takes a row and column and adds their square on board to array if board actually contains such a square (or, in the case of the data array, if the square has already been recorded; we only care about which squares data knows to be safe and friendly)

       */

       var addTokenTo = function(array, row, col, board, data) {
         if (board[row] && board[row][col]) { // a check to ensure that we're not disappearing off the edge
           array.push(board[row][col])
         }

         if (data[row] && data[row][col]) {
           array.push(data[row][col])
         }
       }

     /*
     determines whether the token is safe or unsafe by checking the provided array for empty squares or safe, friendly tokens
     returns the safe or unsafe symbol for the appriproate colour
     */

     function checkSafe(array, token) {
       if (array.includes(BASE_SYMBOL) || array.includes(SAFE[token])) {
         return SAFE[token];
       }

       return DANGER[token];
     }

     /* trySave
     High level: whenever we get a new safe token, we try to save any neighbouring unsafe tokens recorded in the data board. We then repeat the process for each token saved in this way untill there are no more unsafe tokens touching safe tokens in the data board.

     Algorithem: Takes a given board coordinate and generates an array of all the surrounding tokens from data, and their coordinates.

     Searches this array to see if any of it's members are friendly and recorded as unsafe.
       - if so, replaces the unsafe token with with its safe version in data, and
         - runs save that coordinates of that token
     */

     function trySave(row, col, side, data) {
       var neighbours= findNeighbours(addCoordinatesTo, row, col, data);
       neighbours.forEach(function(element) {
         if (element[0] === DANGER[side]) {
           data[element[1][0]][element[1][1]] = SAFE[side];
           trySave(element[1][0], element[1][1], side, data);
         }
       })
     }

   /*
   for every square neighbouring the square denoted by row and col:
    - pushes all surrounding tokens, plus their coordinates to array
   */

   var addCoordinatesTo = function(array, row, col, board) {
     if (board[row] && board[row][col]) {
       array.push([board[row][col], [row, col]]);
     }
   }

 }


q = new Board(4, BASE_SYMBOL);

q.state[0][0] = 'O';
q.state[1][1] = 'X';
q.state[1][0] = 'X';
q.state[0][1] = 'X';
q.state[1][2] = 'O';
q.state[2][1] = 'O';
q.state[0][2] = 'O';
q.state[2][0] = 'X';


q.state[2][3] = 'O';
q.state[3][2] = 'X';
q.state[3][3] = 'X';

console.log(q.state);
console.log(q.process());
