import { template } from 'lodash';

const templateEl = document.getElementById('item-template');
const templateHTML = templateEl.innerHTML;

let itemTemplate = '';

/**
 * Render the filtered items to the DOM
 * @param  {Array}  arr      Array of all items to render into the DOM
 * @param  {Node}   outputEl Element where the items should be outputted in
 * @return {Void}
 */
export default {
  precompile: () => {
    itemTemplate = template(templateHTML);
  },

  render: (items, outputEl) => {
    const output = outputEl;
    const mapped = itemTemplate({ items });

    output.innerHTML = mapped;
  },
};
