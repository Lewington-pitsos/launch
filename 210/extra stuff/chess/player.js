function makePlayer(board, token) {
  return {
    border: board.length,
    board: board,
    token: token,
  };
}

function makeHuman(board, token) {
  makePlayer.call(this, board, token);

  this.play = function() {
    var y = Number(prompt("enter row"));
    var x = Number(prompt("enter column"));

    if (x < this.border && y < this.border) {
      this.board[y][x] = this.token;
    } else {
      alert('that move was wrong');
    }
  };

  return this;
}
