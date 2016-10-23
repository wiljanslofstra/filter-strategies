<?php
    // Create (connect to) SQLite database in file
    $file_db = new PDO('sqlite:dataset.sqlite3');

    // Set errormode to exceptions
    $file_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $arr = [];
    $colors = array('red', 'blue', 'yellow', 'green');
    $number_of_items = 500;

    $insert = "
        INSERT INTO data (name, price, popularity, options, color, radios)
        VALUES (:name, :price, :popularity, :options, :color, :radios)";
    $stmt = $file_db->prepare($insert);

    // Bind parameters to statement variables
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':price', $price);
    $stmt->bindParam(':popularity', $popularity);
    $stmt->bindParam(':options', $options);
    $stmt->bindParam(':color', $color);
    $stmt->bindParam(':radios', $radios);

    for ($i = 0; $i < $number_of_items; $i++) {
        $name = 'test';
        $price = rand(342, 3490);
        $popularity = $i;
        $options = 'option-' . rand(0, 10) . '|option-' . rand(0, 10) . '|option-' . rand(0, 10);
        $color = $colors[rand(0, 3)];
        $radios = 'radio-' . rand(0, 3);

        $stmt->execute();
    }
?>
