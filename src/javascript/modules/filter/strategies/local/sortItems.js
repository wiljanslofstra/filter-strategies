import { sortBy } from 'lodash';

export default (arr, opts) => {
  // Remove sorting from the options
  if (typeof opts.sorting === 'undefined') {
    return arr;
  }

  const sortingProperty = opts.sorting.split('-')[1];
  const sortingDirection = opts.sorting.split('-')[0];

  const sorted = sortBy(arr, item => item[sortingProperty]);

  if (sortingDirection === 'desc') {
    sorted.reverse();
  }

  return sorted;
};
