<?php


if (isset($_POST['id_move'])) {
    $start_arr = $_POST['array'];
    $post_id = $_POST['id_move'];

    $start_arr[$post_id] = "1";
    if (isset($_POST['new_array'])) {
        $new_arr = $_POST['new_array'];
    }


    $new_arr = [
        "n", "n", "n",
        "n", "n", "n",
        "n", "n", "n"
    ];

    if($start_arr != null){
        for ($i = 0; $i < count($start_arr); $i++) {
            if ($start_arr[$i] != null && $start_arr[$i] != "1") {
                $new_arr[$i] = $i;
            }
        }
        $fine =  array_diff($new_arr,["n"]);

        shuffle($fine);

        if(isset($fine[0])){
            echo json_encode($fine[0]);
        }
        else{
            echo json_encode('ok');
        }

    }




//    for ($i = 0; $i < 9; $i++) {
//        echo $start_arr[$i];
//    }
    //echo json_encode($start_arr);
}
//} else {
////    echo json_encode(array('success' => 0));
//}

//$var = $_POST['id_move']; // 1
//
//$var = 5;
//$idsh = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//
//$idsh[$var] = 1;
//
//for ($i = 0; $i < 9; $i++) {
//    echo $idsh[$i];
//}