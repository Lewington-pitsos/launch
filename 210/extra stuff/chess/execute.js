fiver = makeBoard(5);

var frank = new Human(fiver, 9);

var bob = new Computer(fiver, 1);

bob.move();

console.log(frank.board);

frank.move();

bob.move();

console.log(frank.board);
