import { template } from 'lodash';

import filterItems from './filterItems';
import sortItems from './sortItems';

const templateEl = document.getElementById('item-template');
const templateHTML = templateEl.innerHTML;

/**
 * Run all types of filters on the data
 * @param  {Array} arr   Data to sort and filter
 * @param  {Object} opts All filters and options to account for while filtering
 * @return {Array}       An array thats filtered and sorted -- ready to output
 */
function filterAndSortItems(arr, opts) {
  const filtered = filterItems(arr, opts);
  const sorted = sortItems(filtered, opts);

  return sorted;
}

/**
 * Render the filtered items to the DOM
 * @param  {Array}  arr      Array of all items to render into the DOM
 * @param  {Node}   outputEl Element where the items should be outputted in
 * @return {Void}
 */
function render(arr, outputEl) {
  const output = outputEl;

  const itemTemplate = template(templateHTML);

  const mapped = itemTemplate({ items: arr });

  output.innerHTML = mapped;
}

export default {
  /**
   * Initial method when running this strategy, this will start the filtering and rendering process
   * @param  {Node}     outputEl Element where the items should be put after filtering
   * @param  {Object}   opts     Filters and other options that should be accounted for
   * @param  {Function} cb       Callback after the filtering has been done
   * @return {Void}
   */
  renderWithOptions(outputEl, opts, cb) {
    console.log('render with options', opts);

    if (typeof window.items === 'undefined') {
      throw new Error('By using the local filter strategy, you should have a items array');
    }

    const filtered = filterAndSortItems(window.items, opts);

    render(filtered, outputEl);

    this.updateOptions();

    cb(filtered);
  },

  /**
   * This is a method that can update the options after the filtering has been done,
   * like disabling input fields
   * @return {Void}
   */
  updateOptions() {
    if (typeof this.updateOptionsListener !== 'undefined') {
      this.updateOptionsListener();
    }
  },
};
