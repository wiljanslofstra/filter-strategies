import chai from 'chai';
const expect = chai.expect;

import { getNecessaryPages, fillTheGaps } from '../renderPagination';

describe('renderPagination', function () {
  it('should create an array of pages', function () {
    const getPages = getNecessaryPages(1, 3);
    expect(getPages).to.deep.equal([1,2,3]);
  });

  it('should create an array of pages with gaps', function () {
    const getPages = getNecessaryPages(1, 10);
    expect(getPages).to.deep.equal([1, 2, 3, 8, 9, 10]);
  });

  it('should create an array of pages with gaps and another currentpage', function () {
    const getPages = getNecessaryPages(5, 15);
    expect(getPages).to.deep.equal([1, 2, 3, 4, 5, 6, 13, 14, 15]);
  });

  it('should fill the gaps in a pages array', function () {
    let getPages = getNecessaryPages(5, 15);
    getPages = fillTheGaps(getPages);
    expect(getPages).to.deep.equal([1, 2, 3, 4, 5, 6, '...', 13, 14, 15]);
  });

  it('should fill multiple gaps in a pages array', function () {
    let getPages = getNecessaryPages(8, 15);
    getPages = fillTheGaps(getPages);
    expect(getPages).to.deep.equal([1, 2, 3, '...', 7, 8, 9, '...', 13, 14, 15]);
  });
});
