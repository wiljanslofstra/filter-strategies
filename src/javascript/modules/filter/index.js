import handleInput from './handleInput';
import getFilterOptions from './getFilterOptions';
import setFilters from './setFilters';
import config from './config';
import renderItems from './render';

import outputUrlParameters from './helpers/outputUrlParameters';
import retrieveUrlParameters from './helpers/retrieveUrlParameters';
import resetFilter from './helpers/resetFilter';
import renderPagination from './helpers/renderPagination';

// Different strategies available to render products
import strategyLocal from './strategies/local';
import strategyRemote from './strategies/remote';

// Select the strategry with the config parameter
const strategy = config.FILTER_STRATEGY === 'local' ? strategyLocal : strategyRemote;

// Reference to the filter
const filter = document.querySelector(config.FILTER_CLASS);

// Reference to the output element
const output = document.querySelector(config.OUTPUT_CLASS);

// Reference to the count output element
const countEl = document.querySelector('.js-filter-count');

const pageInput = document.querySelector('[name="page"]');

/**
 * Output the number of items after filtering
 * @param  {Number} count Number of items
 * @return {Void}
 */
function outputCount(count) {
  const word = (count === 1) ? 'item' : 'items';
  countEl.innerHTML = `${count} ${word}`;
}

function showLoader() {
  output.classList.add('is-loading');
}

function removeLoader() {
  output.classList.remove('is-loading');
}

/**
 * Run the filter, this will first get all selected options and then renders the items
 * with the chosen strategry
 * @return {Void}
 */
function runFilter() {
  showLoader();

  // Get all chosen filter options
  getFilterOptions(filter, (options) => {
    // Output the chosen filter options in the url
    outputUrlParameters(options);

    // Render the items with the chosen strategry
    strategy.filterWithOptions(options, (filteredAndPagination, filteredCollection) => {
      renderItems.render(filteredAndPagination, output);

      const totalPages = Math.ceil(filteredCollection.length / options.perPage);

      renderPagination(options.page, totalPages);

      removeLoader();
    });
  });
}

export default () => {
  const hash = location.hash;

  renderItems.precompile();

  // Bind a updateOptionsListener to the chosen strategry, if the strategry implements it,
  // this will callback when the options/filters need to be changed in response to the data
  strategy.updateOptionsListener = (filteredAndPagination, filteredCollection) => {
    outputCount(filteredCollection.length);
  };

  // If we have a hash in the url, we immediately start running the fillters
  if (hash) {
    // Get the options from the url
    const options = retrieveUrlParameters();

    // Apply the options in the url to the filter options
    setFilters(filter, options);

    // Start filtering
    runFilter();
  } else if (config.FILTER_ON_INIT) {
    runFilter();
  }

  // The filter has the possibility to hide until all filters have been ran.
  // By removing the class the filters should be visible to the user
  filter.classList.remove('is-cloaked');

  // Listen for changes on the filter, and re-run if changes happen
  handleInput(filter, (type, page) => {
    if (type === 'change') {
      runFilter();
    } else if (type === 'reset') {
      resetFilter(filter);
      runFilter();
    } else if (type === 'paginate') {
      pageInput.value = page;
      runFilter();
    }
  });
};
