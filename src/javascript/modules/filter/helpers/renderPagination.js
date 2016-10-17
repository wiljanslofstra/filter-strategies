import { template } from 'lodash';

const paginationContainer = document.querySelector('.js-filter-pagination');
const paginationHTML = document.getElementById('pagination-template').innerHTML;
const paginationTemplate = template(paginationHTML);

export default (currentPage, totalPages) => {
  const rendered = paginationTemplate({ totalPages });
  paginationContainer.innerHTML = rendered;
};
