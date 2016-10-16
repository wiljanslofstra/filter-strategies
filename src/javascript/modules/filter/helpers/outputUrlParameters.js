import qs from 'qs';
import config from '../config';

/**
 * Output the options to the url as hash. The method will use the History API when
 * available, or fallback to the basic location.hash
 * @param  {Object} obj Options to stringify and output
 * @return {Void}
 */
export default (obj) => {
  const stringified = qs.stringify(obj, { encode: false });

  const paramType = (config.PARAMETER_TYPE === 'get') ? '?' : '#';

  if (window.history) {
    window.history.replaceState(undefined, undefined, `${paramType}${stringified}`);
  } else {
    location.hash = stringified;
  }
};
