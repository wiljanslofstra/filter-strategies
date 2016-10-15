__webpack_public_path__ = window.WEBPACK_PATH; // eslint-disable-line

/* eslint-disable */
import 'modernizr';
import './polyfills/objectAssign';
// import 'es6-promise';
// import 'whatwg-fetch';
import accessibility from './modules/accessibility';

let loadPolyfills = false;

if (!Modernizr.dataset || !Modernizr.classlist || !Modernizr.requestanimationframe) {
  loadPolyfills = true;
}

import filter from './modules/filter';
/* eslint-enable */

if (loadPolyfills) {
  require.ensure([
    './polyfills/dataset',
    './polyfills/classList',
  ], () => {
    filter();
  });
} else {
  filter();
}
