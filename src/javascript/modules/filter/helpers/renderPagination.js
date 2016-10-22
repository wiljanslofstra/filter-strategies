import { template } from 'lodash';

const paginationContainer = document.querySelector('.js-filter-pagination');
let paginationHTML = '';
let paginationTemplate = '';

if (paginationContainer) {
  paginationHTML = document.getElementById('pagination-template').innerHTML;
  paginationTemplate = template(paginationHTML);
}

export function getNecessaryPages(curPage, totalPages) {
  const pagesArr = [];

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

  return pagesArr;
}

export function fillTheGaps(arr) {
  const pagesArr = arr.slice(0);

  // Add ... between the gaps
  pagesArr.forEach((page, i) => {
    if (page - pagesArr[i - 1] > 1) {
      pagesArr.splice(i, 0, '...');
    }
  });

  return pagesArr;
}

export default (currentPage, totalPages) => {
  if (!paginationContainer || !paginationHTML) {
    return;
  }

  const curPage = parseInt(currentPage, 10);

  let pagesArr = getNecessaryPages(curPage, totalPages);
  pagesArr = fillTheGaps(pagesArr);

  const prevPage = ((curPage - 1) >= 1) ? curPage - 1 : 1;
  const nextPage = ((curPage + 1) < totalPages) ? curPage + 1 : totalPages;

  const rendered = paginationTemplate({ pagesArr, totalPages, curPage, prevPage, nextPage });
  paginationContainer.innerHTML = rendered;
};
