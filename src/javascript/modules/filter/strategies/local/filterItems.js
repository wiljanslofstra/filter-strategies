import { each, filter } from 'lodash';

export default (arr, opts) => filter(arr, (item) => {
  let itemValid = true;

  // Loop through filters
  each(opts, (opt, optKey) => {
    const itemPrice = parseFloat(item.price);

    // Handle price filtering
    if (optKey === 'price-from' && itemPrice < opt) { itemValid = false; }
    if (optKey === 'price-to' && itemPrice > opt) { itemValid = false; }

    if (typeof item[optKey] === 'undefined') {
      return;
    }

    if (Array.isArray(opt)) {
      const itemOptions = item[optKey];
      let checkboxesValid = false;

      opt.forEach((filterOption) => {
        if (itemOptions.indexOf(filterOption) >= 0) {
          checkboxesValid = true;
        }
      });

      if (!checkboxesValid) {
        itemValid = false;
      }
    } else if (item[optKey].indexOf(opt) < 0) {
      itemValid = false;
    }
  });

  return itemValid;
});
