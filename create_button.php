<?php
// создаем кнопки
for ($i = 0; $i < 9; $i++) {
    if ($i % 3 == 0) {
        echo '<tr>';
    }
    echo '<td><button id="id_' . $i . '"' . ' class="block"></button></td>';
    if (($i + 1) % 3 == 0) {
        echo '</tr>';
    }
}