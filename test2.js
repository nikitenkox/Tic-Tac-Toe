var dim = 3;
var count = 3;
var check = '';
//var checkArr = [];

var array = [-1,1,0,1,1,1,0,1,-1];
function getItem(x, y) {
  return y * dim + x;
}



function maxLength(a, mark) {
  var count = 0;
  var maxlen = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] == mark) {
      count++;
    }
    else if (maxlen < count) {
      maxlen = count;
      count = 0;
    }

  }
  return maxlen;
}



function checkCow(x, y) {
  var checkArr = [];
  for (var i = 0; i < dim; i++) {
      checkArr.push(array[getItem(x,i)]);
  }
  console.log(checkArr); // получил массив [1,1,1]
  console.log(maxLength(checkArr, 1)) // функция подсчета дольжна бы возвратить 3
  if (maxLength(checkArr, 1) == count) {// maxLength(arr, mark) работает нормально для массивов 
    console.log(true)
  }
}
checkCow(1,1)


function checkRow(x, y) {
  for (var i = 0; i < dim; i++) {
      check += array[getItem(i,y)];
  }
  if (check.search('x'.repeat(count)) > -1) {
    console.log(true)
  }
}



function checkDiag1(x, y) {
  for (var i = 0; i < dim; i++) {
      check += array[getItem(i,i)];
  }
  if (check.search('x'.repeat(count)) > -1) {
    console.log(true)
  }
}

function checkDiag2(x, y) {
  for (var i = 0; i < dim; i++) {
      check += array[getItem(dim-i-1,i)];
  }
  if (check.search((1).toString().repeat(count)) > -1) {
    console.log(true)
  }
}

//checkDiag2(1,1)
//checkDiag1(1,1)
//checkCow(1,2)
//checkRow(1,1)



var h = '',d1 = '',d2 = '',v = '';
function checking(x,y) {
    for (var i = 0; i < dim; i++) {
        h += array[getItem(i,y)];
        v += array[getItem(x,i)];
        d1 +=array[getItem(i,i)];
    }
    checkArr.push(h.search('x'.repeat(count)));
    checkArr.push(v.search('x'.repeat(count)));
    checkArr.push(d1.search('x'.repeat(count)));
    console.log(checkArr)
}
//checking(1,0)
