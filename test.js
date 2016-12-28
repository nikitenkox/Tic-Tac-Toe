
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



function maxLength(a, mark) {
  var count = 0;
  var maxlen = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] === mark) {
      count++;
    }
    else if (maxlen < count) {
      maxlen = count;
      count = 0;
    }

  }
  console.log(maxlen);
  //return maxlen;
}


  var cc = []


function cArr() {
  cc.push(0)
  cc.push(1)
  cc.push(1)
  cc.push(0)
  cc.push(1)
}
cArr();
maxLength(cc,1)
