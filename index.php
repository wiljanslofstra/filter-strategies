<!DOCTYPE html>
<!--[if lte IE 9]><html class="no-js ie9 "> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"><!--<![endif]-->
<head>
    <meta charset="utf-8">

    <title>Filter strategies</title>

    <meta name="author" content="Wiljan Slofstra">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <script type="text/javascript">
        document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + 'js';

        var BASE = '';
        var WEBPACK_PATH = '/build/';
    </script>

    <link rel="stylesheet" href="/build/main.css">
</head>

<body>

    <div class="container">
        <div class="row">
            <form class="js-filter is-cloaked col-sm-4 col-lg-3 filter">
                <div class="form-group">
                    <label>
                        Options
                    </label>
                    <?php for ($i = 0; $i < 11; $i++) : ?>
                        <input type="checkbox" name="options" id="option-<?= $i ;?>" value="option-<?= $i ;?>">
                        <label for="option-<?= $i ;?>">Option <?= $i ;?></label>
                    <?php endfor; ?>
                </div>

                <div class="form-group">
                    <label>
                        Radio options
                    </label>
                    <input type="radio" name="radios" id="radio-empty" value="" checked>
                    <label for="radio-empty">Radio empty</label>

                    <?php for ($i = 0; $i < 4; $i++) : ?>
                        <input type="radio" name="radios" id="radio-<?= $i ;?>" value="radio-<?= $i ;?>">
                        <label for="radio-<?= $i ;?>">Radio <?= $i ;?></label>
                    <?php endfor; ?>
                </div>

                <div class="form-group">
                    <label for="color">
                        Colors
                    </label>
                    <select name="color" id="color">
                        <option value=""></option>
                        <option value="yellow">Yellow</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>
                        Price
                    </label>
                    <input type="text" value="10" name="price-from">
                    <input type="text" value="90" name="price-to">
                </div>

                <div class="form-group">
                    <label for="sorting">
                        Sort by
                    </label>
                    <select name="sorting" id="sorting">
                        <option value="asc-popularity">Popular</option>
                        <option value="asc-price">Price (asc)</option>
                        <option value="desc-price">Price (desc)</option>
                        <option value="asc-date">New collection</option>
                    </select>
                </div>
            </form>

            <div class="col-sm-8 col-lg-9">
                <div class="js-filter-count items-count"></div>

                <div class="js-filter-list">
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        var items = [
            <?php
                $colors = array('red', 'blue', 'yellow', 'green');
            ?>
            <?php for ($i = 0; $i < 500; $i++) : ?>
            {
                name: 'test',
                price: <?= rand(342, 3490); ?>,
                popularity: <?= rand(0, 100); ?>,
                options: ['option-<?= rand(0, 10); ?>', 'option-<?= rand(0, 10); ?>', 'option-<?= rand(0, 10); ?>'],
                color: '<?= $colors[rand(0, 3)]; ?>',
                radios: ['radio-<?= rand(0, 3); ?>'],
            },
            <?php endfor; ?>
        ];
    </script>

    <script type="text/template" id="item-template">
        <ul class="items-list">
            <% items.forEach(function(item) { %>
            <li class="items-list__item">
                <strong>Name:</strong><br>
                <%- item.name %><br>
                <strong>Price:</strong><br>
                <%- item.price %><br>
                <strong>Popularity:</strong><br>
                <%- item.popularity %><br>
                <strong>Color:</strong><br>
                <%- item.color %><br>
                <strong>Options:</strong><br>
                <%- item.options.join(', ') %><br>
                <strong>Radios:</strong><br>
                <%- item.radios.join(', ') %>
            </li>
            <% }); %>
        </ul>
    </script>

    <script async src="/build/bundle.js" type="text/javascript"></script>

</body>
</html>
