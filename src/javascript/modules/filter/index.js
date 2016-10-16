import handleInput from './handleInput';
import getFilterOptions from './getFilterOptions';
import setFilters from './setFilters';
import config from './config';

import outputUrlParameters from './helpers/outputUrlParameters';
import retrieveUrlParameters from './helpers/retrieveUrlParameters';

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

/**
 * Output the number of items after filtering
 * @param  {Number} count Number of items
 * @return {Void}
 */
function outputCount(count) {
  const word = (count === 1) ? 'item' : 'items';
  countEl.innerHTML = `${count} ${word}`;
}

function runFilter() {
  getFilterOptions(filter, (options) => {
    outputUrlParameters(options);

    strategy.renderWithOptions(output, options, () => {
    });
  });
}

export default () => {
  const hash = location.hash;

  strategy.updateOptionsListener = (filteredItems) => {
    outputCount(filteredItems.length);
  };

  if (hash) {
    const options = retrieveUrlParameters();
    setFilters(filter, options);
    runFilter();
  } else if (config.FILTER_ON_INIT) {
    runFilter();
  }

  filter.classList.remove('is-cloaked');

  handleInput(filter, () => {
    runFilter();
  });
};
