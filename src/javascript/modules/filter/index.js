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
import strategySemiLocal from './strategies/semi-local';
import strategyRemote from './strategies/remote';

const strategies = {
  local: strategyLocal,
  'semi-local': strategySemiLocal,
  remote: strategyRemote,
};

// Select the strategry with the config parameter
const strategy = strategies[config.FILTER_STRATEGY];

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
    strategy.filterWithOptions(options, (filteredAndPagination) => {
      renderItems.render(filteredAndPagination, output);
      removeLoader();
    });
  });
}

export default () => {
  const hash = location.hash;

  renderItems.precompile();

  // Bind a updateOptionsListener to the chosen strategry, if the strategry implements it,
  // this will callback when the options/filters need to be changed in response to the data
  strategy.updateOptionsListener = (options, filteredAndPagination, originalCollection) => {
    let totalPages, totalItems, page;

    if (Array.isArray(originalCollection)) {
      totalPages = Math.ceil(originalCollection.length / options.perPage);
      totalItems = originalCollection.length;
    } else {
      totalPages = originalCollection.total_pages;
      totalItems = originalCollection.total_items;
    }

    page = (options.page > totalPages) ? totalPages : options.page;

    renderPagination(page, totalPages);
    outputCount(totalItems);
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
