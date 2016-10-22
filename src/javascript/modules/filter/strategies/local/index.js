import filterItems from './filterItems';
import sortItems from './sortItems';
import paginateItems from './paginateItems';

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
  filterWithOptions(opts, cb, items = window.items) {
    console.log('render with options', opts);

    if (typeof items === 'undefined') {
      throw new Error('By using the local filter strategy, you should have a items array');
    }

    const filtered = filterAndSortItems(items, opts);

    const paginated = paginateItems(filtered, opts.page, opts.perPage);

    this.updateOptions(paginated, filtered);

    cb(paginated, filtered);
  },

  /**
   * This is a method that can update the options after the filtering has been done,
   * like disabling input fields
   * @return {Void}
   */
  updateOptions(paginated, filtered) {
    this.updateOptionsListener(paginated, filtered);
  },
};
