import filterItems from './filterItems';
import sortItems from './sortItems';

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

export default {
  updateOptionsListener: () => {},

  /**
   * Initial method when running this strategy, this will start the filtering and rendering process
   * @param  {Object}   opts     Filters and other options that should be accounted for
   * @param  {Function} cb       Callback after the filtering has been done
   * @return {Void}
   */
  renderWithOptions(opts, cb) {
    console.log('render with options', opts);

    if (typeof window.items === 'undefined') {
      throw new Error('By using the local filter strategy, you should have a items array');
    }

    const filtered = filterAndSortItems(window.items, opts);

    this.updateOptions(filtered);

    cb(filtered);
  },

  /**
   * This is a method that can update the options after the filtering has been done,
   * like disabling input fields
   * @return {Void}
   */
  updateOptions(filtered) {
    this.updateOptionsListener(filtered);
  },
};
