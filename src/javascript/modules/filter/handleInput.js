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
};
