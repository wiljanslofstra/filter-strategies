import serializeAndRepopulate from './helpers/serializeAndRepopulate';

/**
 * Wrapper around the serialize and repopulate helper, this will apply the
 * chosen filter options to the filter DOM elements
 * @param  {Node}   el      Filter container element
 * @param  {Object} options Options to apply to the filter
 * @return {Void}
 */
export default (el, options) => {
  serializeAndRepopulate(el, options);
};
