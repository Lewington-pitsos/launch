function Player(board, token) {
  this.board = board;
  this.token = token;
  this.border = function() {
    return this.board.length;
  }

  this.placeAt = function (coordinates) {
    this.board[coordinates[0]][coordinates[1]] = this.token;
  }

  this.test = function(coordinates){
    return (coordinates[0] < this.border() && coordinates[1] < this.border());
  }

  this.move = function(){
    var input = this.chooseSpace();
    if (this.test(input)) {
      this.placeAt(input);
    } else {
      this.move();
    }
  }
}

function Human(board, token) {
  Player.call(this, board, token);

  this.chooseSpace = function() {
    var row = Number(prompt('choose a row index'));
    var col = Number(prompt('choose a clumn index'));
    return [row, col];
  }
}

function Computer(board, token) {
  Player.call(this, board, token);

  this.chooseSpace = function() {
    var row = Math.floor(Math.random() * 4);
    var col = Math.floor(Math.random() * 4);
    console.log(row);
    console.log(col);
    return [row, col];
  }
}
