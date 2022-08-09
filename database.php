<?php

class Db
{
    public int $level;
    public string $hash;

    public function __construct($hash)
    {
        $query = "SELECT * FROM `tic_tac_users` WHERE hash LIKE '%" . $hash . "%'";
        $result = $this->connection()->query($query);

        // проверяем на существование пользователя в БД
        if ($result->num_rows > 0) {

            $get_data = "SELECT * FROM `tic_tac_users`";
            if ($result = $this->connection()->query($get_data)) {
                foreach ($result as $row) {
                    $this->hash = $row["hash"];
                    $this->level = $row["level"];
                }
                $result->free(); // Освобождает память, занятую результатами запроса
            } else {
                echo "Ошибка: " . self::connection()->error;
            }
        } else {
            $this->level = 0;
            $this->hash = $hash;
            $this->saveIndex();
        }
        self::connection()->close();
    }


    function connection()
    {
        $db = mysqli_connect(
            'localhost',
            'root',
            'root',
            'tic_tac_users',
            '3306',
        ) or die('Error in established MySQL-server connect');
        return $db;
    }

    function saveIndex()
    {
        if(isset($_POST['level'])){
            $this->level = $_POST['level'];
        }
        $query = "INSERT INTO `tic_tac_users` (hash, level) VALUES ('$this->hash','$this->level')";
        $this->interactionDb(self::connection(), $query);

    }

    public function interactionDb(bool|mysqli|null $connection, string $query)
    {
        mysqli_query($connection, $query) or die ('Error in query to database') . mysqli_error($connection);
        mysqli_close($connection);
    }
}

