import request from 'superagent';
import localStrategy from '../local';

let products = [];

export default {
  updateOptionsListener: () => {},

  /**
   * Use the semi-local filter
   * @param  {Object}   opts Options object (pagination, filters etc.)
   * @param  {Function} cb   Callback to use when everything is finished
   * @return {Void}
   */
  filterWithOptions(opts, cb) {
    if (products.length) {
      this.handleProducts(opts, cb, products);
    } else {
      request
        .get('products.php')
        .type('application/json')
        .end((err, res) => {
          if (err) {
            throw new Error(err);
          }

          // 'cache' products
          products = res.body;

          this.handleProducts(opts, cb, res.body);
        });
    }
  },

  /**
   * Handle products
   * @param  {Object}   opts Options object
   * @param  {Function} cb   Callback after the local strategy has finished
   * @param  {Array}    arr  Array of products
   * @return {Void}
   */
  handleProducts(opts, cb, arr) {
    localStrategy.filterWithOptions(opts, (paginated, filtered) => {
      this.updateOptions(paginated, filtered);
      cb(paginated, filtered);
    }, arr);
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
