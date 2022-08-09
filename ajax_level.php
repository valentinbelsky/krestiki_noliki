<?php
// обновляет уровень игрока
if (isset($_POST['level'])) {
    $level = $_POST['level'];
    $hash = $_POST['hash'];

    $query = "UPDATE `tic_tac_users` SET level = '$level' WHERE hash = '$hash'";

    $connection = mysqli_connect(
        'localhost',
        'root',
        'root',
        'tic_tac_users',
        '3306',
    ) or die('Error in established MySQL-server connect');

    mysqli_query($connection, $query) or die ('Error in query to database') . mysqli_error($connection);
    mysqli_close($connection);
}