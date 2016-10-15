import { template } from 'lodash';

import filterItems from './filterItems';
import sortItems from './sortItems';

const templateEl = document.getElementById('item-template');
const templateHTML = templateEl.innerHTML;

const countEl = document.querySelector('.js-filter-count');

function filterAndSortItems(arr, opts) {
  const filtered = filterItems(arr, opts);
  const sorted = sortItems(filtered, opts);

  return sorted;
}

function outputCount(count) {
  const word = (count === 1) ? 'item' : 'items';
  countEl.innerHTML = `${count} ${word}`;
}

function render(arr, outputEl) {
  const output = outputEl;

  const itemTemplate = template(templateHTML);

  const mapped = itemTemplate({ items: arr });

  outputCount(arr.length);

  output.innerHTML = mapped;
}

export default {
  renderWithOptions(outputEl, opts, cb) {
    console.log('render with options', opts);

    if (typeof window.items === 'undefined') {
      throw new Error('By using the local filter strategy, you should have a items array');
    }

    const filtered = filterAndSortItems(window.items, opts);

    render(filtered, outputEl);

    this.updateOptions();

    cb();
  },

  updateOptions() {
    if (typeof this.updateOptionsListener !== 'undefined') {
      this.updateOptionsListener();
    }
  },
};
