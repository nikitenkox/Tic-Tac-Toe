var arr = ['0', 0, '', '0', 'x', 'x', 'x', 'x', 'x'];
var c = 2;
var dim = 3;
var checkStr = '';
var checkArr = [];


function getCoords(y, x) {
    for (var i = 0; i < dim; i++) {
        for (var j = 0; j < dim; j++) {
            if (y == i && x == j) {
                return arr[i * dim + j];
            }
        }
    }
}


function check(y, x) {
    for (var i = 0; i < dim; i++) {
        if (getCoords(y, i) == 'x') {
            checkStr += 'y';
        } else {
            checkStr += 'n';
        }
    }
    checkArr.push(checkStr.search('y'.repeat(c))); // checkStr.search('y'.repeat(c))
    checkStr = '';
    for (var i = 0; i < dim; i++) {
        if (getCoords(i, x) == 'x') {
            checkStr += 'y';
        } else {
            checkStr += 'n';
        }
    }
    checkArr.push(checkStr.search('y'.repeat(c))); // checkStr.search('y'.repeat(c))
    checkStr = '';
    for (var i = 0; i < dim; i++) {
        if (getCoords(i, i) == 'x') {
            checkStr += 'y';
        } else {
            checkStr += 'n'
        }
    }
    checkArr.push(checkStr.search('y'.repeat(c)));
    checkStr = '';

    for (var i = 0; i < checkArr.length; i++) {
        if (checkArr[i] > -1) {
            return 'win';
            break;
        } else {
            return null;
        }
    }
}

console.log(check(1, 2))
