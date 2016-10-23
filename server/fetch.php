<?php
    // Create (connect to) SQLite database in file
    $file_db = new PDO('sqlite:dataset.sqlite3');

    // Set errormode to exceptions
    $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (empty($_POST)) {
        exit;
    }

    $post = $_POST;

    $list = "
        SELECT *
        FROM data
    ";

    $sorting = explode('-', $post['sorting']);
    $sorting_key = $sorting[1];
    $sorting_dir = $sorting[0];

    $list .= "ORDER BY " . $sorting_key . " " . strtoupper($sorting_dir);

    $stmt = $file_db->prepare($list);

    $stmt->execute();

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $filtered_arr = [];

    $original_collection = $items;

    foreach($items as $i => $item) {
        $is_valid = true;

        $item['options'] = explode('|', $item['options']);
        $item['radios'] = explode('|', $item['radios']);

        if ($item['price'] < $post['price-from'] || $item['price'] > $post['price-to']) {
            $is_valid = false;
        }

        if (isset($post['options'])) {
            $options_valid = false;

            foreach($post['options'] as $option) {
                if (in_array($option, $item['options'])) {
                    $options_valid = true;
                }
            }

            if (!$options_valid) {
                $is_valid = false;
            }
        }

        if (isset($post['radios'])) {
            $radios_valid = false;

            foreach($post['radios'] as $option) {
                if (in_array($option, $item['radios'])) {
                    $radios_valid = true;
                }
            }

            if (!$radios_valid) {
                $is_valid = false;
            }
        }

        if (isset($post['color'])) {
            if ($item['color'] !== $post['color']) {
                $is_valid = false;
            }
        }

        if ($is_valid) {
            array_push($filtered_arr, $item);
        }
    }

    $total_items = count($filtered_arr);

    $filtered_arr = array_slice($filtered_arr, ($post['page'] - 1) * $post['perPage'], $post['perPage']);

    header('Content-Type: application/json');

    echo json_encode([
        'items' => $filtered_arr,
        'options' => [
            'total_pages' => ceil($total_items / $post['perPage']),
            'total_items' => $total_items
        ]
    ]);
?>
