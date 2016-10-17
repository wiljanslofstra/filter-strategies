/**
 * Pagination collection
 * @param  {Array}  collection Array of items to paginate
 * @param  {Number} page       Current page
 * @param  {Number} pageLength How many items per page
 * @return {Array}             Paginated array
 */
export default (collection, page, pageLength) => {
  let currentPage = parseInt(page, 10);
  const perPage = parseInt(pageLength, 10);
  const collectionLength = collection.length;
  const totalPages = Math.ceil(collectionLength / perPage);

  if (page > totalPages) {
    currentPage = totalPages;
  }

  if (page < 1) {
    currentPage = 1;
  }

  currentPage -= 1;

  const pageOffset = currentPage * perPage;
  const pageOffsetEnd = pageOffset + perPage;

  const collectionOnPage = collection.slice(pageOffset, pageOffsetEnd);

  return collectionOnPage;
};
