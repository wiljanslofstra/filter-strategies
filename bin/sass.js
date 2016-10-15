var sass = require('node-sass');
var path = require('path');
var fs = require('fs');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var reporter = require('postcss-reporter')

// Paths
var sassPath = path.resolve(__dirname, '../src/sass', 'main.scss');
var outputPath = path.resolve(__dirname, '../build', 'main.css');
var mapPath = path.resolve(__dirname, '../build', 'main.css.map');

// Options
var autoprefixerOptions = { browsers: ['last 2 version', 'ie >= 9', 'iOS >= 7', 'android >= 4.1'] };
var cssnanoOptions = { autoprefixer: false, discardComments: { removeAllButFirst: true } };

function postCSS(css) {
  return postcss([
    autoprefixer(autoprefixerOptions),
    cssnano(cssnanoOptions),
    reporter({ clearMessages: true }),
  ])
    .process(css, {
      from: outputPath,
      to: outputPath,
      map: { inline: false },
    })
    .then(function (result) {
      // Write CSS file
      fs.writeFile(outputPath, result.css, function(err) {
        if (err) {
          console.log(err);
        }
      });

      // Write sourcemap
      if (result.map) {
        fs.writeFileSync(mapPath, result.map);
      }
    });
}

module.exports = function() {
  return new Promise((resolve, reject) => {
    sass.render({
      file: sassPath,
      outFile: outputPath,
    }, function(error, result) {
      if (!error) {
        // Run PostCSS
        postCSS(result.css)
          .then(function() {
            resolve();
          });
      } else {
        console.log(error);
        reject(error);
      }
    });

  });
};
