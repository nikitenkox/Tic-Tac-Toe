'use strict';

var arrayField = [];
var field = document.getElementsByClassName('field')[0];
var formedItems = document.getElementsByClassName('item');
var body = document.body;
var item;
var pos;
var user;
var count = 0;
var clicked;

// создаем игровое поле и одномерный array игры
function renderField(size) {
    for (var i = 0; i < size; i++) {
        item = document.createElement('div');
        item.classList.add('item');
        field.appendChild(item);
    }
    for (var j = 0; j < size; j++) {
        arrayField.push(1);
    }
}


// создаем поле
renderField(9);

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


// определяем индекс кликнутой ячейки
for (var u = 0; u < formedItems.length; u++) {
    formedItems[u].id = u;
    formedItems[u].addEventListener('click', function(event) {
        clicked = this.id;
    })
}


// делаем делегацию событий при клике на ячейку
body.addEventListener('click', function(event) {
    if (isLastMove(count)) {
        placeMark(arrayField.indexOf(1), false);
    }
    if (event.target.tagName == 'DIV') {
        placeMark(clicked, true);
        renderView(arrayField);
    }
    checkVictory(arrayField);
});


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
    if (c >= arrayField.length-1) {
        return true;
    }
    else {
        return false;
    }
}

// проверка победителя
function checkVictory(arr) {
    var uWin = arr.toString().search(/x,x,x/);
    var cWin = arr.toString().search(/0,0,0/);
    var uWin1 = arr.join().search(/x.{5}x.{5}x/);
    var cWin1 = arr.toString().search(/0.{5}0.{5}0/);
    if ((uWin > -1) && (uWin % 3 == 0) || uWin1 > -1) {
        alert('user wins');
    } else if ((cWin > -1) && (cWin % 3 == 0) || cWin1 > -1) {
        alert('program wins');
    }
    else if (count > arrayField.length-1) {
        alert('draw');
    }
}
