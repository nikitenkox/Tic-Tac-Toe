'use strict';

document.addEventListener("DOMContentLoaded", function() {
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

    var field = document.querySelector('.field'); // TODO: проще document.querySelector('.field'), найдет первый элемент по запрошенному селектору
    var form = document.getElementById('gameform'); // TODO: не сказал бы, что это хорошая практика. Лучше уже document.getElementsById.
    var body = document.body;
    var finisBox = document.querySelector('.finished');

    document.getElementById('begin').addEventListener('click', begin);

    document.getElementById('reload').addEventListener('click', reload);

    field.style.display = 'none';

    //начало игры
    function begin() {
        /**
         * TODO: Хранить настройки и состояние игры в виде обьекта game = {
         *   fieldSize: 3,
         *   marksForWin: 3,
         *   fieldState: [....],
         *   ...
         * }
         */
        // создаем поле
        renderField(document.beginGame.size.value);
        //указываем количество клеточек для победы
        squaresForWin(document.beginGame.winCount.value);
        //прятаем форму, показываем поле
        form.style.display = 'none';
        field.style.display = 'block';
    }

    var formedItems = document.getElementsByClassName('item'); // TODO: А ведь в этот момент этих ячеек в DOM еще нет.

    // делаем делегацию событий при клике на ячейку
    field.addEventListener('click', function(event) {
        for (var u = 0; u < formedItems.length; u++) {
            formedItems[u].id = u;
        }
        if (isLastMove(game.count)) {
            placeMark(game.arrayField.indexOf(-1), false);
        }
        if (event.target.tagName == 'DIV') {
            game.clicked = event.target.id;
            placeMark(game.clicked, true);
            renderView(game.arrayField);
        }
        game.checkingArray.length = 0;
        var x = (game.clicked - game.clicked % game.sizeLength) / game.sizeLength;
        var y = game.clicked % game.sizeLength;
        var x1 = (game.pos - game.pos % game.sizeLength) / game.sizeLength;;
        var y1 = game.pos % game.sizeLength;

        var cowU = checkCow(y, x, 1);
        game.checkingArray.length = 0;
        var rowU = checkRow(y, x, 1)
        game.checkingArray.length = 0;
        var diag1U = checkDiag1(y, x, 1);
        game.checkingArray.length = 0;
        var diag2U = checkDiag2(y, x, 1);
        game.checkingArray.length = 0;

        var cowC = checkCow(y1, x1, 0);
        game.checkingArray.length = 0;
        var rowC = checkRow(y1, x1, 0)
        game.checkingArray.length = 0;
        var diag1C = checkDiag1(y1, x1, 0);
        game.checkingArray.length = 0;
        var diag2C = checkDiag2(y1, x1, 0);
        game.checkingArray.length = 0;

        if (cowU || rowU || diag1U || diag2U) {
            game.win = true;
            game.winner = 'User';
        }
        else if (cowC || rowC || diag1C || diag2C) {
            game.win = true;
            game.winner = 'Computer';
        }
        if (game.win) {
            field.style.display = 'none';
            finisBox.style.display = 'block';
            finisBox.getElementsByTagName('h1')[0].innerHTML += game.winner;
        }
    });
    // создаем игровое поле и одномерный array игры
    function renderField(size) {
        game.sizeLength = Math.sqrt(size);
        field.style.width = Math.sqrt(size) * 102 + 'px';
        for (var i = 0; i < size; i++) {
            game.item = document.createElement('div');
            game.item.classList.add('item');
            field.appendChild(game.item);
        }
        for (var j = 0; j < size; j++) {
            game.arrayField.push(-1);
        }
    }

    // делаем ход
    function placeMark(mark, b) {
        if (game.arrayField[mark] == -1) {
            game.arrayField.splice(mark, 1, 1);
            while (b) {
                game.pos = Math.floor(Math.random() * game.arrayField.length); // получаем рандомное число от 0 до 8
                if (game.arrayField[game.pos] == -1) {
                    game.arrayField.splice(game.pos, 1, 0);
                    b = false;
                }
            }
            game.count = game.count + 2;
        }
    }

    // заполняем ячейки
    function renderView(arr) {
        for (var k = 0; k < arr.length; k++) {
            if (arr[k] == 1) {
                formedItems[k].innerHTML = 'x'
            } else if (arr[k] == 0) {
                formedItems[k].innerHTML = '0';
            }

        }
    }

    // проверяем, остался один ход, или нет
    function isLastMove(c) {
        if (c >= game.arrayField.length - 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * TODO: Эта проверка на победителя интересна, но не динамична и очень зависит от конкретной реализации метода toString() и search()
     * Переделать на действительно алгоримическое определение победителя. Используй циклы и логику
     */

    //определяем количество ячеек для победы
    function squaresForWin(n) {
        game.sqWinCount = n;
    }


    function reload() {
        location.reload(); // перезагружаем страницу
    }

    // координаты 2d массива в 1d
    function getItem(x, y) {
        return y * game.sizeLength + x;
    }

    //определяем длинну максимальную длинну последовательного вхождения символа в массив
    function maxLength(a, mark) {
        var c = 0;
        var maxlen = [];
        var max;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === mark) {
                c++;
            }
            maxlen.push(c);
            if (a[i] !== mark) {
                c = 0;
            }
        }
        return (Math.max.apply(Math, maxlen) >= game.sqWinCount) ? true : false;
    }
    // проверка на наличие победителя
    function checkRow(x, y, mark) {
        for (var i = 0; i < game.sizeLength; i++) {
            game.checkingArray.push(game.arrayField[getItem(i, y)]);
        }
        return maxLength(game.checkingArray, mark);
    }

    function checkCow(x, y, mark) {
        for (var i = 0; i < game.sizeLength; i++) {
            game.checkingArray.push(game.arrayField[getItem(x, i)]);
        }
        return maxLength(game.checkingArray, mark);
    }

    function checkDiag1(x, y, mark) {
        for (var i = 0; i < game.sizeLength; i++) {
            game.checkingArray.push(game.arrayField[getItem(i, i)]);
        }
        return maxLength(game.checkingArray, mark);
    }

    function checkDiag2(x, y, mark) {
        for (var i = 0; i < game.sizeLength; i++) {
            game.checkingArray.push(game.arrayField[getItem(game.sizeLength - i - 1, i)]);
        }
        return maxLength(game.checkingArray, mark);
    }

})
