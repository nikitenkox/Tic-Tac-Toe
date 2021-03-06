'use strict';

document.addEventListener("DOMContentLoaded", () => {
    let game = {
        pos: null,
        arrayField: new Array(),
        item: null,
        count: 0,
        clicked: null,
        players: {
            user: 'User',
            computer: 'Computer'
        },
        marks: {
            user: 1,
            computer: 0,
            empty: -1
        },
        view: {
            user: 'x',
            computer: '0'
        },
        sizeLength: null,
        sqWinCount: null,
        formedItems: null
    };

    function begin(event) {
        event.preventDefault();
        let gameOptionsForm = document.querySelector("form");
        setGameOptions(gameOptionsForm);
        renderField(game.sizeLength);
        form.style.display = 'none';
        field.style.display = 'block';
        game.formedItems = document.getElementsByClassName('item');
    }

    function renderField(size) {
        field.style.width = size * 102 + 'px';
        for (let i = 0; i < Math.pow(size, 2); i++) {
            game.arrayField.push(game.marks.empty);
            game.item = document.createElement('div');
            game.item.classList.add('item');
            field.appendChild(game.item);
        }
    }

    function setGameOptions(form) {
        game.sizeLength = form.size.value;
        game.sqWinCount = form.winCount.value;
    }

    function placeMark(mark, b) {
        if (game.arrayField[mark] == game.marks.empty) {
            game.arrayField.splice(mark, 1, game.marks.user);
            while (b) {
                game.pos = Math.floor(Math.random() * game.arrayField.length);
                if (game.arrayField[game.pos] == game.marks.empty) {
                    game.arrayField.splice(game.pos, 1, game.marks.computer);
                    b = false;
                }
            }
            game.count = game.count + 2;
        }
    }

    function renderView(arr) {
        game.formedItems[game.clicked].innerHTML = game.view.user;
        game.formedItems[game.pos].innerHTML = game.view.computer;
    }

    function isLastMove(c) {
        if (c >= game.arrayField.length - 1) {
            return true;
        } else {
            return false;
        }
    }

    function reload() {
        location.reload();
    }

    function getItem(x, y) {
        return y * game.sizeLength + x;
    }

    function maxLength(a, mark) {
        let c = 0;
        let maxlen = [];
        let max;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === mark) {
                c++;
            }
            maxlen.push(c);
            if (a[i] !== mark) {
                c = 0;
            }
        }
        return (Math.max.apply(Math, maxlen) >= game.sqWinCount)
            ? true
            : false;
    }

    function checkRow(x, y, mark) {
        let arr = [];
        for (let i = 0; i < game.sizeLength; i++) {
            arr.push(game.arrayField[getItem(i, y)]);
        }
        return maxLength(arr, mark);
    }

    function checkCol(x, y, mark) {
        let arr = [];
        for (let i = 0; i < game.sizeLength; i++) {
            arr.push(game.arrayField[getItem(x, i)]);
        }
        return maxLength(arr, mark);
    }

    function checkDiag1(x, y, mark) {
        let arr = [];
        let dif = y - x;
        let rdif = x - y;
        if (x == y) {
            for (let i = 0; i < game.sizeLength; i++) {
                arr.push(game.arrayField[getItem(i, i)]);
            }
        } else if (y >= x) {
            for (let i = dif; i < game.sizeLength; i++) {
                arr.push(game.arrayField[getItem(i, (i - dif))]);
            }
        } else {
            for (let i = 0; i < (game.sizeLength - rdif); i++) {
                arr.push(game.arrayField[getItem(i, (i + rdif))]);
            }
        }
        return maxLength(arr, mark);
    }

    function checkDiag2(x, y, mark) {
        let arr = [];
        let max = x + y;
        if ((game.sizeLength - x - 1) == y) {
            for (let i = 0; i < game.sizeLength; i++) {
                arr.push(game.arrayField[getItem(game.sizeLength - i - 1, i)]);
            }
        } else if ((x + y) < (game.sizeLength - 1)) {
            for (let i = 0; i <= max; i++) {
                arr.push(game.arrayField[getItem(i, (max - i))]);
            }
        } else {
            for (let i = ((max % game.sizeLength) + 1); i <= game.sizeLength - 1; i++) {
                arr.push(game.arrayField[getItem(i, (max - i))]);
            }
        }
        return maxLength(arr, mark);
    }

    function getWinner() {
        let x = (game.clicked - game.clicked % game.sizeLength) / game.sizeLength;
        let y = game.clicked % game.sizeLength;
        let x1 = (game.pos - game.pos % game.sizeLength) / game.sizeLength;
        let y1 = game.pos % game.sizeLength;

        let colU = checkCol(y, x, game.marks.user);
        let rowU = checkRow(y, x, game.marks.user);
        let diag1U = checkDiag1(x, y, game.marks.user);
        let diag2U = checkDiag2(x, y, game.marks.user);

        let colC = checkCol(y1, x1, game.marks.computer);
        let rowC = checkRow(y1, x1, game.marks.computer);
        let diag1C = checkDiag1(x1, y1, game.marks.computer);
        let diag2C = checkDiag2(x1, y1, game.marks.computer);

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
    }

    const field = document.querySelector('.field');
    const form = document.getElementById('gameform');
    const body = document.body;
    const finisBox = document.querySelector('.finished');

    document.getElementById('begin').addEventListener('click', begin);

    document.getElementById('reload').addEventListener('click', reload);

    field.style.display = 'none';

    field.addEventListener('click', function(event) {
        for (let u = 0; u < game.formedItems.length; u++) {
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
        getWinner();
    });
})
