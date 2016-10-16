export default (filterWrapper) => {
  const inputElements = filterWrapper.querySelectorAll('input,select');
  const inputElementsArr = Array.prototype.slice.call(inputElements);

  inputElements.forEach((el) => {
    const tagName = el.tagName.toLowerCase();

    if (tagName === 'input') {
      const type = el.getAttribute('type');
      const defaultVal = el.dataset.default;
      const hasDefault = (typeof defaultVal !== 'undefined');

      if (type === 'checkbox' || type === 'radio') {
        el.checked = (hasDefault);
        return;
      }

      el.value = (hasDefault) ? defaultVal : '';
    }

    if (tagName === 'select') {
      const defaultVal = el.querySelector('[data-default]');

      if (defaultVal) {
        el.value = defaultVal.value;
      } else {
        el.value = '';
      }
    }
  });
};
