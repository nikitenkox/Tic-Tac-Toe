var dim = 3;
var count = 3;
var check = '';
var checkArr = [];

var array = [1,1,1,0,1,0,0,0,0];

function checkRow(x, y) {
    for (var i = 0; i < dim; i++) {
        checkArr.push(array[getItem(i, y)]);
    }
    return streak(checkArr, 1);
    checkArr.length = 0;
}
//console.log(checkRow(1,0))


function maxLength(a, mark) {
  var c = 0;
  var maxlen = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === mark) {
      c++;
    }
    else if (maxlen < c) {
      maxlen = c;
      c = 0;
    }
  }
  /*if (maxlen == 0 || maxlen >= game.sqWinCount) {
    return true;
  }
  else {
    return false;
  }*/
  return maxlen
}
var at = [1,-1,1];
console.log(maxLength(at, 1))






function check(x, y) {
  for (var i = 0; i < game.sizeLength; i++) {
      game.checkingArray.push(game.arrayField[getItem(x, i)]);
  }
  return maxLength(game.checkingArray, 1);
  game.checkingArray.length = 0;
}

var a = [1,0,0,1,0,1,1,0,0];

console.log(check(0,0));



function getItem(x, y) {
    return y * dim + x;
}


function streak(arr, mark) {
    var i,
        temp,
        streak,
        length = arr.length,
        highestStreak = 0;
    for (i = 0; i < length; i++) {
        if (temp != '' && temp == arr[i]) {
            streak++;
        } else {
            streak = mark;
        }
        temp = arr[i];
        if (streak > highestStreak) {
            highestStreak = streak;
        }
    }
    //return (highestStreak >= 2) ? true : false;
    return highestStreak
}
var ar = [-1,-1,1,-1];
//console.log(streak(ar, 1))

function checkCow(x, y) {
    for (var i = 0; i < dim; i++) {
        checkArr.push(array[getItem(x, i)]);
    }
    return streak(checkArr, 1);
    checkArr.length = 0;
}
//console.log(checkCow(1, 1))



function checkDiag1(x, y) {
    for (var i = 0; i < dim; i++) {
        checkArr.push(array[getItem(i, i)])
    }
    return streak(checkArr, 1);
    checkArr.length = 0;
}

//console.log(checkDiag1(0,0))

function checkDiag2(x, y) {
    for (var i = 0; i < dim; i++) {
        checkArr.push(array[getItem(dim - i - 1, i)]);
        console.log(getItem(dim - i - 1, i))
    }
    console.log(checkArr)
    return streak(checkArr, 1);
    checkArr.length = 0;
}

//console.log(checkDiag2(0,2))

//checkDiag2(1,1)
//checkDiag1(1,1)
//checkCow(1,2)
//checkRow(1,1)



var h = '',
    d1 = '',
    d2 = '',
    v = '';

function checking(x, y) {
    for (var i = 0; i < dim; i++) {
        h += array[getItem(i, y)];
        v += array[getItem(x, i)];
        d1 += array[getItem(i, i)];
    }
    checkArr.push(h.search('x'.repeat(count)));
    checkArr.push(v.search('x'.repeat(count)));
    checkArr.push(d1.search('x'.repeat(count)));
    console.log(checkArr)
}
//checking(1,0)
