import qs from 'qs';
import config from '../config';

/**
 * Output the options to the url as hash. The method will use the History API when
 * available, or fallback to the basic location.hash
 * @param  {Object} obj Options to stringify and output
 * @return {Void}
 */
export default (obj, requestType = config.PARAMETER_TYPE) => {
  const stringified = qs.stringify(obj, { encode: false });

  const paramType = (requestType === 'get') ? '?' : '#';

  if (window.history) {
    window.history.replaceState(undefined, undefined, `${paramType}${stringified}`);
  } else {
    location.hash = stringified;
  }
};
