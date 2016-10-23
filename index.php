<?php
    $base_directory = basename(dirname($_SERVER[PHP_SELF]));
    define('BASE_URL', ($base_directory != '') ? '/' . $base_directory : $base_directory);

    $number_of_items = 500;

    if (isset($_GET) && isset($_GET['total-items'])) {
        $number_of_items = $_GET['total-items'];

        if ($number_of_items > 50000) {
            $number_of_items = 50000;
        }
    }
?>
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
        var WEBPACK_PATH = '<?= BASE_URL; ?>/build/';
    </script>

    <link rel="stylesheet" href="<?= BASE_URL; ?>/build/main.css">
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
                    <input type="radio" name="radios" id="radio-empty" value="" checked data-default>
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
                    <div class="custom-select">
                        <select name="color" id="color">
                            <option value="">No preference</option>
                            <option value="yellow">Yellow</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="red">Red</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label>
                        Price
                    </label>
                    <input type="text" value="342" name="price-from" data-default="342">
                    <input type="text" value="3490" name="price-to" data-default="3490">
                </div>

                <div class="form-group">
                    <label for="sorting">
                        Sort by
                    </label>
                    <div class="custom-select">
                        <select name="sorting" id="sorting">
                            <option value="asc-popularity" data-default>Popular</option>
                            <option value="asc-price">Price (asc)</option>
                            <option value="desc-price">Price (desc)</option>
                            <option value="asc-date">New collection</option>
                        </select>
                    </div>
                </div>

                <input type="hidden" name="page" value="1" data-default="1">
                <input type="hidden" name="perPage" value="18" data-default="18">

                <div class="form-group">
                    <a class="u-icon-link u-icon-link--before js-filter-reset" href="#">
                        <i class="icon icon-remove" aria-hidden="true"></i>Reset filters
                    </a>
                </div>
            </form>

            <div class="col-sm-8 col-lg-9">
                <div class="js-filter-count items-count"></div>

                <div class="js-filter-list items-wrapper">
                </div>

                <div class="js-filter-pagination pagination"></div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        var items = [
            <?php
                $colors = array('red', 'blue', 'yellow', 'green');
            ?>
            <?php for ($i = 0; $i < $number_of_items; $i++) : ?>
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

        window.STRATEGY = 'local';
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

    <script type="text/template" id="pagination-template">
        <a class="pagination-arrow js-filter-paginate <% if (prevPage === curPage) { %>is-disabled<% } %>" href="#" title="Previous page" data-page="<%- prevPage %>">
            &laquo;
        </a>

        <ul class="pagination-list">
            <% pagesArr.forEach((item) => { %>
            <li class="pagination-list__item <% if (item === curPage) { %>is-active<% } %>">
                <% if (item !== '...' && item !== curPage) { %>
                <a class="js-filter-paginate" href="#" data-page="<%- item %>">
                    <%- item %>
                </a>
                <% } else { %>
                    <span>
                        <%- item %>
                    </span>
                <% } %>
            </li>
            <% }); %>
        </ul>

        <a class="pagination-arrow js-filter-paginate <% if (nextPage === curPage) { %>is-disabled<% } %>" href="#" title="Next page" data-page="<%- nextPage %>">
            &raquo;
        </a>
    </script>

    <script async src="<?= BASE_URL; ?>/build/bundle.js" type="text/javascript"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-85710483-1', 'auto');
      ga('send', 'pageview');

    </script>

</body>
</html>
