import qs from 'qs';

/**
 * Parse the hash in the url with qs
 * @return {Object} Parsed location.hash
 */
export default () => qs.parse(location.hash.substring(1));
