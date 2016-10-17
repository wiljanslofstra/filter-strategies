export default (filterWrapper) => {
  const inputElements = filterWrapper.querySelectorAll('input,select');
  const inputElementsArr = Array.prototype.slice.call(inputElements);

  inputElementsArr.forEach((el) => {
    const elInst = el;
    const tagName = el.tagName.toLowerCase();

    if (tagName === 'input') {
      const type = elInst.getAttribute('type');
      const defaultVal = elInst.dataset.default;
      const hasDefault = (typeof defaultVal !== 'undefined');

      if (type === 'checkbox' || type === 'radio') {
        elInst.checked = (hasDefault);
        return;
      }

      elInst.value = (hasDefault) ? defaultVal : '';
    }

    if (tagName === 'select') {
      const defaultVal = elInst.querySelector('[data-default]');

      if (defaultVal) {
        elInst.value = defaultVal.value;
      } else {
        elInst.value = '';
      }
    }
  });
};
