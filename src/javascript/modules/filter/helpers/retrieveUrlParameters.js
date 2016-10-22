import qs from 'qs';

/**
 * Parse the hash in the url with qs
 * @return {Object} Parsed location.hash
 */
export default () => {
  const hash = location.hash;
  const removedSymbol = hash.substring(1);
  const parsed = qs.parse(removedSymbol);
  return parsed;
};
