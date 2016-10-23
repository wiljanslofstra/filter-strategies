import request from 'superagent';
import { each } from 'lodash';

export default {
  updateOptionsListener: () => {},

  filterWithOptions(opts, cb) {
    console.log('render with options', opts);

    const dupOpts = Object.assign(opts);
    each(dupOpts, (optVal, optKey) => {
      if (Array.isArray(optVal)) {
        dupOpts[optKey + '[]'] = optVal;
        delete dupOpts[optKey];
      }
    });

    request
      .post('server/fetch.php')
      .type('form')
      .send(opts)
      .end((err, res) => {
        if (err) {
          throw new Error(err);
        }

        this.updateOptions(opts, res.body.items, res.body.options);

        cb(res.body.items);
      });
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
