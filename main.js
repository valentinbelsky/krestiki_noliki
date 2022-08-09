$(function () {

    let id_button = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let count, arhv;
    let win_x = 0;
    let win_0 = 0;

    // Прослушиваем кнопки на совершение клика,
    // если клик, есть отправляем данные в bot.php
    for (let i = 0; i < 9; i++) {
        let id = i;


        document.getElementById('id_' + i).addEventListener('click', function () {
            if (document.getElementById("winner").innerHTML !== "Победа крестиков" &&
                document.getElementById("winner").innerHTML !== "Победа ноликов" &&
                document.getElementById("winner").innerHTML !== "Ничья" ) {

                if(id_button[id] !== "1"){
                    myBot(id);
                }
            }
        });
    }

    function myBot(id) {
        arhv = 1;
        id_button[id] = "1";

        input_fn_x(document.getElementById('id_' + id));
        count = document.getElementById("arhv").innerHTML += arhv;
        count = count.length;
        winner();

        for (let i = 0; i < 9; i++) {

            if (id === i &&
                document.getElementById("winner").innerHTML !== "Победа крестиков" &&
                document.getElementById("winner").innerHTML !== "Победа ноликов") {
                $.ajax({
                    type: 'POST',
                    url: 'bot.php',
                    dataType: 'html',
                    data: {
                        id_move: id,
                        array: id_button
                    },
                    success: function (data) {
                        console.log(data);
                        $('#qwerty').html(data);
                        if (document.getElementById('id_' + data).innerHTML !== null) {

                            input_fn_0(document.getElementById('id_' + data));

                            id_button[data] = "1";
                        }
                        winner();
                    }
                });
            }
        }
        document.getElementById("ans").innerHTML = id_button;
    }

// Определение победителя
    function winner() {
        allBlocks = document.getElementsByClassName("block");
        if (count === 5) {
            document.getElementById("winner").innerHTML = "Ничья";
            window.stop();
        }
        // Победили крестики
        if ((allBlocks[0].innerHTML == "x" & allBlocks[1].innerHTML == "x" & allBlocks[2].innerHTML == "x") ||
            (allBlocks[3].innerHTML == "x" & allBlocks[4].innerHTML == "x" & allBlocks[5].innerHTML == "x") ||
            (allBlocks[6].innerHTML == "x" & allBlocks[7].innerHTML == "x" & allBlocks[8].innerHTML == "x") ||
            (allBlocks[0].innerHTML == "x" & allBlocks[3].innerHTML == "x" & allBlocks[6].innerHTML == "x") ||
            (allBlocks[1].innerHTML == "x" & allBlocks[4].innerHTML == "x" & allBlocks[7].innerHTML == "x") ||
            (allBlocks[2].innerHTML == "x" & allBlocks[5].innerHTML == "x" & allBlocks[8].innerHTML == "x") ||
            (allBlocks[0].innerHTML == "x" & allBlocks[4].innerHTML == "x" & allBlocks[8].innerHTML == "x") ||
            (allBlocks[2].innerHTML == "x" & allBlocks[4].innerHTML == "x" & allBlocks[6].innerHTML == "x")
        ) {
            calculation_x();
            window.stop();
        }
        // Победили крестики
        if ((allBlocks[0].innerHTML == "0" & allBlocks[1].innerHTML == "0" & allBlocks[2].innerHTML == "0") ||
            (allBlocks[3].innerHTML == "0" & allBlocks[4].innerHTML == "0" & allBlocks[5].innerHTML == "0") ||
            (allBlocks[6].innerHTML == "0" & allBlocks[7].innerHTML == "0" & allBlocks[8].innerHTML == "0") ||
            (allBlocks[0].innerHTML == "0" & allBlocks[3].innerHTML == "0" & allBlocks[6].innerHTML == "0") ||
            (allBlocks[1].innerHTML == "0" & allBlocks[4].innerHTML == "0" & allBlocks[7].innerHTML == "0") ||
            (allBlocks[2].innerHTML == "0" & allBlocks[5].innerHTML == "0" & allBlocks[8].innerHTML == "0") ||
            (allBlocks[0].innerHTML == "0" & allBlocks[4].innerHTML == "0" & allBlocks[8].innerHTML == "0") ||
            (allBlocks[2].innerHTML == "0" & allBlocks[4].innerHTML == "0" & allBlocks[6].innerHTML == "0")
        ) {
            calculation_0();
        }
    }

    // Прослушиваем кнопку RESTART
    // если клик обновляем игру
    document.getElementById('restart').addEventListener('click', function () {
        restart();
    });

    function input_fn_0(elem) {
        elem.innerHTML = "0";
        elem.style.backgroundColor = "#1aff00";
    }

    function input_fn_x(elem) {
        elem.innerHTML = "x";
        elem.style.backgroundColor = "#ff0000";
    }

    function input_fn_reset(elem) {
        elem.style.border = "0";
        elem.style.backgroundColor = "#efeff0";
    }

    function restart() {
        for (let i = 0; i < 9; i++) {
            allBlocks[i].innerHTML = null;
        }
        document.getElementById("arhv").innerHTML = null;
        document.getElementById("ans").innerHTML = null;

        for (let i = 0; i < 9; i++) {
            input_fn_reset(document.getElementById('id_' + i));
        }
        document.getElementById("winner").innerHTML = "Победа __________";
        id_button = [0, 0, 0, 0, 0, 0, 0, 0, 0];


        $.ajax({
            type: 'POST',
            url: 'bot.php',
            dataType: 'html',
            data: {
                new_array: id_button
            },
            success: function (data) {

            }
        });

    }

     function calculation_x() {

        let lew = Number(document.getElementById("level").innerHTML);
        document.getElementById("winner").innerHTML = "Победа крестиков";
        lew += 1;
        win_x += 1;
        document.getElementById("win_x").innerHTML = win_x;

        let level = lew;
         ajax(level);
        if(level >= 1){
            ajax(level);
        }
        window.stop();
    }

    function calculation_0() {
        document.getElementById("winner").innerHTML = "Победа ноликов";
        win_0 += 1;
        document.getElementById("win_0").innerHTML = win_0;
        let lew = Number(document.getElementById("level").innerHTML);
        if(lew > 1){
            lew -= 1;
            win_x -= 1;
            let level = lew;
            ajax(level);
        }
        alert('0');
        window.stop();
    }

    function ajax(level) {
        let hash = document.getElementById("hash").innerHTML;
        document.getElementById("level").innerHTML = level;

        $(function() {
            $.ajax({
                type: 'POST',
                url: 'ajax_level.php',
                dataType: 'html',
                cache: false,
                data: {
                    level: level,
                    hash: hash
                },
                success: function () {
                }
            });
        })
    }

})
