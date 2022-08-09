
<?php
// Запускаем сессию, поллучили hash(id) пользователя
session_start();
$hash = session_id();

// Проверям пользователя
// Подключаем БД
require "database.php";

// Проверяем hash пользователя,
// если есть, то вернуть текущий уровень
// если нет, то записать нового пользователя и установить уровень 0
// Создаем экземпляр объекта Db
$user = new Db($hash);
?>

<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
	      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="style.css">
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"
	        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
	<script src="main.js"></script>
	<title>Крестики-нолики</title>
</head>
<body>
<h1 id="content"></h1>
<h2 id="level">Ваш уровень: <?php echo $user->level ?></h2>
<h6 id="hash" hidden><?php echo $user->hash ?></h6>
<h1 id="ans" hidden></h1>
<table>
	<!--	создаем кнопки-->
	<?php require_once "create_button.php" ?>
</table>

<h1 id="winner">Победа __________</h1>
<button id="restart">Restart</button>

<div id="rezult" hidden></div>
<div id="arhv" hidden></div>
<p>Победы крестиков</p>
<div id="win_x">0</div>
<p>Победы ноликов</p>
<div id="win_0">0</div>

<div id="qwerty" hidden></div>
</body>
</html>


<?php
include "bot.php";
?>