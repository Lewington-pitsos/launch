function totalArea(array) {
  return array.reduce(findArea, 0);
}

function findArea(total, array) {
  return total += array[0] * array[1];
}

var rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

//console.log(totalArea(rectangles)); // 141

function onlySquares(array) {
  return array[0] === array[1];
}

function totalSquareArea(array) {
  return totalArea(array.filter(onlySquares));
}

console.log(totalSquareArea(rectangles)); // 121
