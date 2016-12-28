var dim = 3;
var count = 3;
var check = '';

var array = [1,'x',0,'x','x','1',0,'x',1]

function getItem(x, y) {
  return y * dim + x;
}

function checkRow(x, y) {
  for (var i = 0; i < dim; i++) {
      check += array[getItem(i,y)];
  }
  if (check.search('x'.repeat(count)) > -1) {
    console.log(true)
  }
}

function checkCow(x, y) {
  for (var i = 0; i < dim; i++) {
      check += array[getItem(x,i)];
  }
  if (check.search('x'.repeat(count)) > -1) {
    console.log(true)
  }
}

checkCow(1,2)
//checkRow(1,1)
