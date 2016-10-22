<?php
    $colors = array('red', 'blue', 'yellow', 'green');
    $number_of_items = 5000;
    $arr = [];

    for ($i = 0; $i < $number_of_items; $i++) {
        array_push($arr, array(
            'name' => 'test',
            'price' => rand(342, 3490),
            'popularity' => $i,
            'options' => ['option-' . rand(0, 10), 'option-' . rand(0, 10), 'option-' . rand(0, 10)],
            'color' => $colors[rand(0, 3)],
            'radios' => ['radio-' . rand(0, 3)],
        ));
    }

    header('Content-Type: application/json');

    echo json_encode($arr);
?>
