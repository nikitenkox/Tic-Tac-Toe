'use strict';

document.addEventListener("DOMContentLoaded", function() {
    var game = {
        pos: null,
        arrayField: new Array(),
        item: null,
        count: 0,
        checkingArray: new Array(),
        clicked: null,
        players: {
            user: 'User',
            computer: 'Computer'
        },
        marks: {
            user: 1,
            computer: 0
        },
        view: {
            user: 'x',
            compiter: '0'
        },
        sizeLength: null,
        sqWinCount: null,
        formedItems: null
    }

    var field = document.querySelector('.field'); // TODO: проще document.querySelector('.field'), найдет первый элемент по запрошенному селектору
    var form = document.getElementById('gameform'); // TODO: не сказал бы, что это хорошая практика. Лучше уже document.getElementsById.
    var body = document.body;
    var finisBox = document.querySelector('.finished');

    document.getElementById('begin').addEventListener('click', begin);

    document.getElementById('reload').addEventListener('click', reload);

    field.style.display = 'none';

    //начало игры
    function begin(event) {
        event.preventDefault();
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
        game.formedItems = document.getElementsByClassName('item'); // TODO: А ведь в этот момент этих ячеек в DOM еще нет.
    }


    // делаем делегацию событий при клике на ячейку
    field.addEventListener('click', function(event) {
        for (var u = 0; u < game.formedItems.length; u++) {
            game.formedItems[u].id = u;
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

        var colU = checkCol(y, x, game.marks.user);
        var rowU = checkRow(y, x, game.marks.user)
        var diag1U = checkDiag1(y, x, game.marks.user);
        game.checkingArray.length = 0;
        var diag2U = checkDiag2(y, x, game.marks.user);
        game.checkingArray.length = 0;

        var colC = checkCol(y1, x1, game.marks.computer);
        var rowC = checkRow(y1, x1, game.marks.computer)
        var diag1C = checkDiag1(y1, x1, game.marks.computer);
        game.checkingArray.length = 0;
        var diag2C = false // checkDiag2(y1, x1, game.marks.computer);
        game.checkingArray.length = 0;

        if (colU || rowU || diag1U || diag2U) {
            game.win = true;
            game.winner = game.players.user;
        } else if (colC || rowC || diag1C || diag2C) {
            game.win = true;
            game.winner = game.players.computer;
        } else if (game.count > Math.pow(game.sizeLength, 2) - 1) {
            alert('draw');
            reload();
        }
        if (game.win) {
            field.style.display = 'none';
            finisBox.style.display = 'block';
            finisBox.getElementsByTagName('h1')[0].innerHTML += game.winner;
        }
    });
    // создаем игровое поле и одномерный array игры
    function renderField(size) {
        game.sizeLength = size;
        field.style.width = size * 102 + 'px';
        for (var i = 0; i < Math.pow(size, 2); i++) {
            game.arrayField.push(-1);
            game.item = document.createElement('div');
            game.item.classList.add('item');
            field.appendChild(game.item);
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
        game.formedItems[game.clicked].innerHTML = 'x';
        game.formedItems[game.pos].innerHTML = '0';
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
        var arr = [];
        for (var i = 0; i < game.sizeLength; i++) {
            arr.push(game.arrayField[getItem(i, y)]);
        }
        return maxLength(arr, mark);
    }

    function checkCol(x, y, mark) {
        var arr = [];
        for (var i = 0; i < game.sizeLength; i++) {
            arr.push(game.arrayField[getItem(x, i)]);
        }
        return maxLength(arr, mark);
    }

    function checkDiag1(x, y, mark) {
        var arr = [];
        var x = (game.clicked - game.clicked % game.sizeLength) / game.sizeLength;
        var y = game.clicked % game.sizeLength;
        //console.log(game.clicked);
        //console.log('x = ' + y + '||| y = ' + x);
        if (x == y) {
            for (var i = 0; i < game.sizeLength; i++) {
                arr.push(game.arrayField[getItem(i, i)]);
            }
            //console.log(arr);
        }
        else if (y >= x) {
            console.log('x>=y');
        }
        else {
            console.log('no');
        }
        return maxLength(arr, mark);
    }

    function checkDiag2(x, y, mark) {
        var arr = [];
        var x = (game.clicked - game.clicked % game.sizeLength) / game.sizeLength;
        var y = game.clicked % game.sizeLength;
        var max = x + y;
        //console.log('x = ' + y + '||| y = ' + x/* (game.sizeLength-x-1)*/);
        //console.log('xy < size ' + ((x + y)<(game.sizeLength - 1)));
        //console.log('from x0 = 0; y0 = ' +(x+y) );
        //console.log('to xn = ' + (x+y) + ' yn = 0');
        if ((game.sizeLength - x - 1) == y) {
            for (var i = 0; i < game.sizeLength; i++) {
                arr.push(game.arrayField[getItem(game.sizeLength - i - 1, i)]);
            }
        } else if ((x + y) < (game.sizeLength - 1)) {
            for (var i = 0; i <= max; i++) {
                arr.push(game.arrayField[getItem(i, (max - i))])
            }
        } else {
            for (var i = ((max % game.sizeLength) + 1); i <= game.sizeLength - 1; i++) {
                arr.push(game.arrayField[getItem(i, (max - i))]);
            }
        }
        return maxLength(arr, mark);
    }
})
