const paginationContainer = document.querySelector('.js-filter-pagination');

/**
 * Listen for changes on the filters
 * @param  {Node}     el Filter container element
 * @param  {Function} cb Callback when the filters have changed
 * @return {Void}
 */
export default (el, cb) => {
  const inputElements = el.querySelectorAll('input,select');
  const inputElementsArr = Array.prototype.slice.call(inputElements);

  const resetButton = el.querySelector('.js-filter-reset');

  inputElementsArr.forEach((input) => {
    input.addEventListener('change', () => {
      cb('change');
    });
  });

  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    cb('reset');
  });

  paginationContainer.addEventListener('click', (e) => {
    e.preventDefault();

    if (!e.target) return;

    const className = e.target.className;

    if (className.indexOf('js-filter-paginate') >= 0) {
      const paginationEl = e.target;
      const page = parseInt(paginationEl.dataset.page, 10);

      cb('paginate', page);
    }
  });
};
