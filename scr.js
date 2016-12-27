'use strict';

var arrayField = [];
var field = document.getElementsByClassName('field')[0];
var formedItems = document.getElementsByClassName('item');
var form = document.beginGame;
var body = document.body;
var finisBox = document.getElementsByClassName('finished')[0];
var item;
var pos;
var user;
var count = 0;
var checkingArray = [];
var clicked;
var sizeLength;
var sqWinCount;

field.style.display = 'none';

//начало игры
function begin() {
    // создаем поле
    renderField(document.beginGame.size.value);
    //указываем количество клеточек для победы
    squaresForWin(document.beginGame.winCount.value);
    //прятаем форму, показываем поле
    form.style.display = 'none';
    field.style.display = 'block';
    // определяем индекс кликнутой ячейки
    for (var u = 0; u < formedItems.length; u++) {
        formedItems[u].id = u;
        formedItems[u].addEventListener('click', function(event) {
            clicked = this.id;
        })
    }
}


// делаем делегацию событий при клике на ячейку
field.addEventListener('click', function(event) {
    if (isLastMove(count)) {
        placeMark(arrayField.indexOf(1), false);
    }
    if (event.target.tagName == 'DIV') {
        placeMark(clicked, true);
        renderView(arrayField);
    }
    checkVictory(arrayField);
});



// создаем игровое поле и одномерный array игры
function renderField(size) {
    sizeLength = Math.sqrt(size);
    field.style.width = Math.sqrt(size) * 102 + 'px';
    for (var i = 0; i < size; i++) {
        item = document.createElement('div');
        item.classList.add('item');
        field.appendChild(item);
    }
    for (var j = 0; j < size; j++) {
        arrayField.push(1);
    }
}

// делаем ход
function placeMark(mark, b) {
    if (arrayField[mark] == 1) {
        arrayField.splice(mark, 1, 'x');
        while (b) {
            pos = Math.floor(Math.random() * arrayField.length); // получаем рандомное число от 0 до 8
            if (arrayField[pos] == 1) {
                arrayField.splice(pos, 1, '0');
                b = false;
            }
        }
        count = count + 2;
    }
}

// заполняем ячейки
function renderView(arr) {
    for (var k = 0; k < arr.length; k++) {
        if (arr[k] !== 1) {
            formedItems[k].innerHTML = arr[k];
        }
    }
}

// проверяем, остался один ход, или нет
function isLastMove(c) {
    if (c >= arrayField.length - 1) {
        return true;
    } else {
        return false;
    }
}

//определяем количество ячеек для победы
function squaresForWin(n) {
    sqWinCount = n;
    checkingArray.push(new RegExp('x,'.repeat(n-1).concat('x')));
    checkingArray.push(new RegExp('0,'.repeat(n-1).concat('0')));
    var t = 'x.' + '{' + (sizeLength * 2 - 1) + '}';
    t = t.repeat(n - 1) + 'x';
    checkingArray.push(new RegExp(t));
    t = '0.' + '{' + (sizeLength * 2 - 1) + '}';
    t = t.repeat(n - 1) + '0';
    checkingArray.push(new RegExp(t));
}

// проверка победителя
function checkVictory(arr) {
    var uWin = arr.toString().search(checkingArray[0]);
    var cWin = arr.toString().search(checkingArray[1]);
    var uWin1 = arr.toString().search(checkingArray[2]);
    var cWin1 = arr.toString().search(checkingArray[3]);
    if ((uWin > -1) && (uWin % (sizeLength * 2) < (sizeLength * 2 - (sqWinCount * 2 - 1))) || uWin1 > -1 || uWin2 > -1) {
        field.style.display = 'none';
        finisBox.style.display = 'block';
        finisBox.getElementsByTagName('h1')[0].innerHTML += 'user'
    } else if ((cWin > -1) && (cWin % (sizeLength * 2) < (sizeLength * 2 - (sqWinCount * 2 - 1))) || cWin1 > -1 || cWin2 > -1) {
        field.style.display = 'none';
        finisBox.style.display = 'block';
        finisBox.getElementsByTagName('h1')[0].innerHTML += 'computer'
    } else if (count > arrayField.length - 1) {
        field.style.display = 'none';
        finisBox.style.display = 'block';
        finisBox.getElementsByTagName('h1')[0].innerHTML = 'draw'
    }
}

function reload() {
    location.reload(); // перезагружаем страницу
}
