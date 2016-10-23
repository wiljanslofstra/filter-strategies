import request from 'superagent';
import localStrategy from '../local';

let items = [];

export default {
  updateOptionsListener: () => {},

  /**
   * Use the semi-local filter
   * @param  {Object}   opts Options object (pagination, filters etc.)
   * @param  {Function} cb   Callback to use when everything is finished
   * @return {Void}
   */
  filterWithOptions(opts, cb) {
    if (items.length) {
      this.handleItems(opts, cb, items);
    } else {
      request
        .get('server/api.php')
        .type('application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }

          // 'cache' items
          items = res.body;

          this.handleItems(opts, cb, res.body);
        });
    }
  },

  /**
   * Handle items
   * @param  {Object}   opts Options object
   * @param  {Function} cb   Callback after the local strategy has finished
   * @param  {Array}    arr  Array of items
   * @return {Void}
   */
  handleItems(opts, cb, arr) {
    localStrategy.filterWithOptions(opts, (paginated, filtered) => {
      this.updateOptions(opts, paginated, filtered);
      cb(paginated, filtered);
    }, arr);
  },

  /**
   * This is a method that can update the options after the filtering has been done,
   * like disabling input fields
   * @return {Void}
   */
  updateOptions(options, paginated, filtered) {
    this.updateOptionsListener(options, paginated, filtered);
  },
};
