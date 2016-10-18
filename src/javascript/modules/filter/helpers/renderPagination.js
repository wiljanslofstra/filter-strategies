import { template } from 'lodash';

const paginationContainer = document.querySelector('.js-filter-pagination');
const paginationHTML = document.getElementById('pagination-template').innerHTML;
const paginationTemplate = template(paginationHTML);

export default (currentPage, totalPages) => {
  const pagesArr = [];

  const curPage = parseInt(currentPage, 10);

  const beforeCurPage = (curPage - 2) ? curPage - 2 : 1;
  const afterCurPage = curPage + 2;

  // Get only the necessary pagination items to navigate
  for (let i = 1; i <= totalPages; i += 1) {
    if (
      i <= 3 || // One of the first pages
      i > (totalPages - 3) || // One of the last pages
      (
        i > beforeCurPage && // Is it a neighbour of the currentpage
        i < afterCurPage
      )
    ) {
      pagesArr.push(i);
    }
  }

  // Add ... between the gaps
  pagesArr.forEach((page, i) => {
    if (page - pagesArr[i - 1] > 1) {
      pagesArr.splice(i, 0, '...');
    }
  });

  const rendered = paginationTemplate({ pagesArr, totalPages, curPage });
  paginationContainer.innerHTML = rendered;
};
