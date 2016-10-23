<?php
    // Create (connect to) SQLite database in file
    $file_db = new PDO('sqlite:dataset.sqlite3');

    // Set errormode to exceptions
    $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $list = "SELECT * FROM data";
    $stmt = $file_db->prepare($list);

    $stmt->execute();

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($items as $i => $item) {
        $item['options'] = explode('|', $item['options']);
        $item['radios'] = explode('|', $item['radios']);

        $items[$i] = $item;
    }

    header('Content-Type: application/json');

    echo json_encode($items);
?>
