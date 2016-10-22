# Filter strategies

Filtering system written in vanilla Javascript. The system is separated in two parts, a part that
takes care of input and rendering. And an interchangeable part that retrieves, filters and sorts
the items. The interchangeable part (strategy) could for example retrieve the items from the DOM,
or get them from an API.

## Available strategies
### Local - items are defined in the document
This is particularly useful for small datasets. I would say a maximum of 200 products. This will
cause a large HTML file that needs to be downloaded by the client.
- [Demo with 1000 items](https://wiljanslofstra.com/filter-strategies/?total-items=1000)
- [Demo with 10000 items](https://wiljanslofstra.com/filter-strategies/?total-items=10000)

### Semi-local - the complete dataset is requested from an API
Useful for slightly larger dataset, initial page load will be faster with this strategy. But the
whole dataset needs to be downloaded. So this is still not suitable for large datasets.
- [Demo with 5000 items](https://wiljanslofstra.com/filter-strategies/index-semi-local.php)

### Remote - on each filter change a request to the API is made for items
For large datasets, it will only retrieve the items from the API that are on the current page.
The requested payloads will be smaller, but there is a little delay when paginating or filtering.
// TODO

## Roadmap
- [x] Pagination
- [ ] Add remote strategy (fetch items from an API)
- [x] Add filter remove/reset button and implementation
- [ ] Add a nice price slider (at the moment we only have two input fields)
- [ ] Create a real life example
