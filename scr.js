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
            placeMark(game.arrayField.indexOf(1), false);
        }
        if (event.target.tagName == 'DIV') {
            game.clicked = event.target.id;
            placeMark(game.clicked, true);
            renderView(game.arrayField);
        }
        checkVictory(game.arrayField);
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
            game.arrayField.push(1);
        }
    }

    // делаем ход
    function placeMark(mark, b) {
        if (game.arrayField[mark] == 1) {
            game.arrayField.splice(mark, 1, 'x');
            while (b) {
                game.pos = Math.floor(Math.random() * game.arrayField.length); // получаем рандомное число от 0 до 8
                if (game.arrayField[game.pos] == 1) {
                    game.arrayField.splice(game.pos, 1, '0');
                    b = false;
                }
            }
            game.count = game.count + 2;
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
        game.checkingArray.push(new RegExp('x,'.repeat(n - 1).concat('x')));
        game.checkingArray.push(new RegExp('0,'.repeat(n - 1).concat('0')));
        var t = 'x.' + '{' + (game.sizeLength * 2 - 1) + '}';
        t = t.repeat(n - 1) + 'x';
        game.checkingArray.push(new RegExp(t));
        t = '0.' + '{' + (game.sizeLength * 2 - 1) + '}';
        t = t.repeat(n - 1) + '0';
        game.checkingArray.push(new RegExp(t));
    }

    // проверка победителя
    function checkVictory(arr) {

        var uWin = arr.toString().search(game.checkingArray[0]);
        var cWin = arr.toString().search(game.checkingArray[1]);
        var uWin1 = arr.toString().search(game.checkingArray[2]);
        var cWin1 = arr.toString().search(game.checkingArray[3]);
        if ((uWin > -1) && (uWin % (game.sizeLength * 2) < (game.sizeLength * 2 - (game.sqWinCount * 2 - 1))) || uWin1 > -1 || uWin2 > -1) {
            field.style.display = 'none';
            finisBox.style.display = 'block';
            finisBox.getElementsByTagName('h1')[0].innerHTML += 'user'
        } else if ((cWin > -1) && (cWin % (game.sizeLength * 2) < (game.sizeLength * 2 - (game.sqWinCount * 2 - 1))) || cWin1 > -1 || cWin2 > -1) {
            field.style.display = 'none';
            finisBox.style.display = 'block';
            finisBox.getElementsByTagName('h1')[0].innerHTML += 'computer'
        } else if (game.count > game.arrayField.length - 1) {
            field.style.display = 'none';
            finisBox.style.display = 'block';
            finisBox.getElementsByTagName('h1')[0].innerHTML = 'draw'
        }
    }

    function reload() {
        location.reload(); // перезагружаем страницу
    }

})
