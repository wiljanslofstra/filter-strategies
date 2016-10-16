import { template } from 'lodash';

const templateEl = document.getElementById('item-template');
const templateHTML = templateEl.innerHTML;

/**
 * Render the filtered items to the DOM
 * @param  {Array}  arr      Array of all items to render into the DOM
 * @param  {Node}   outputEl Element where the items should be outputted in
 * @return {Void}
 */
export default (arr, outputEl) => {
  const output = outputEl;

  const itemTemplate = template(templateHTML);

  const mapped = itemTemplate({ items: arr });

  output.innerHTML = mapped;
};
