
var game = {}
game.arrayField = ['0', 0, '', 'x', 'x', 'x', '', '', 'x'];
game.sizeLength = 3;
game.sqWinCount = 3
game.checkStr = '';
game.checkArr = [];


function getCoords(y, x) {
    for (var i = 0; i < game.sizeLength; i++) {
        for (var j = 0; j < game.sizeLength; j++) {
            if (y == i && x == j) {
                return game.arrayField[i * game.sizeLength + j];
            }
        }
    }
}


function check(y, x) {
    for (var i = 0; i < game.sizeLength; i++) {
        if (getCoords(y, i) == 'x') {
            game.checkStr += 'y';
        } else {
            game.checkStr += 'n';
        }
    }
    game.checkArr.push(game.checkStr.search('y'.repeat(game.sqWinCount))); // game.checkStr.search('y'.repeat(c))
    game.checkStr = '';
    for (var i = 0; i < game.sizeLength; i++) {
        if (getCoords(i, x) == 'x') {
            game.checkStr += 'y';
        } else {
            game.checkStr += 'n';
        }
    }
    game.checkArr.push(game.checkStr.search('y'.repeat(game.sqWinCount))); // game.checkStr.search('y'.repeat(c))
    game.checkStr = '';
    for (var i = 0; i < game.sizeLength; i++) {
        if (getCoords(i, i) == 'x') {
            game.checkStr += 'y';
        } else {
            game.checkStr += 'n'
        }
    }
    game.checkArr.push(game.checkStr.search('y'.repeat(game.sqWinCount)));
    game.checkStr = '';

    for (var i = 0; i < game.checkArr.length; i++) {
        if (game.checkArr[i] > -1) {
            return 'win';
            break;
        } else {
            return null;
        }
    }
}

//console.log(check(1, 1))


var arr = [0,1,1,1,0,0,1];




/*for (var i = 0; i < a.length; i++) {
  if (a[i] === 1) {
    c++;
  }
  else if (maxlen < c) {
    maxlen = c;
    c = 0;
  }

}*/





function getItem(x, y) {
  return y * dim + x;
}

var dim = 3;
var array = [1,-1,1]
var count = 3;

//var array = [3,3,3,3,4];

console.log(maxLength(array, 1))

function maxLength(a, mark) {
  var c = 0;
  var maxlen = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === mark && a[i] !== '') {
      c++;
    }
    else if (maxlen < c) {
      maxlen = c;
      c = 0;
    }
  }
  return maxlen
  /*if (maxlen == 0 || maxlen >= 2) {
    return true;
  }
  else {
    return false;
  }*/
}






function genArr() {
    //var a = [0,0,0,0,1,1,0,1,1,1,0];
    var a = []
    for (var i = 0; i < 10; i++) {
      a.push(Math.floor(Math.random()*2));
    }

    console.log(a)
    console.log(maxLength(a,1));
    console.log(streak(a,1))
}
//genArr()
//console.log(maxLength(array,1))





function streak(arr,mark) {
    var i,
        temp,
        streak,
        length = arr.length,
        highestStreak = 0;

    for(i = 0; i < length; i++) {
        // check the value of the current entry against the last
        if(temp != '' && temp == arr[i]) {
            // it's a match
            streak++;
        } else {
            // it's not a match, start streak from 1
            streak = mark;
        }

        // set current letter for next time
        temp = arr[i];

        // set the master streak var
        if(streak > highestStreak) {
            highestStreak = streak;
        }
    }

    return highestStreak;
}

var game = {
    pos: null,
    arrayField: new Array(),
    item: null,
    count: 0,
    checkingArray: new Array(),
    clicked: null,
    sizeLength: null,
    sqWinCount: null
}

function checkRow(x, y) {
    for (var i = 0; i < game.sizeLength; i++) {
        game.checkArr.push(game.arrayField[getItem(i, y)]);
    }
    return streak(game.checkArr, 1);
    game.checkArr.length = 0;
}


// try

function boo(a) {
  return a || true
}
//console.log(boo(0));

function gen() {
  var r = Math.floor(Math.random()*10);
  console.log(boo(r) + '|' + r)
}
//gen()





function streak(arr) {
    var i,
        temp,
        streak,
        length = arr.length,
        highestStreak = 0;

    for(i = 0; i < length; i++) {
        // check the value of the current entry against the last
        if(temp == arr[i]) {
            // it's a match
            streak++;
        } else {
            // it's not a match, start streak from 1
            streak = 1;
        }

        // set current letter for next time
        temp = arr[i];

        // set the master streak var
        if(streak > highestStreak) {
            highestStreak = streak;
        }
    }

    return highestStreak;
}



//console.log(streak(array));
