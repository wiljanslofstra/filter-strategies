import chai from 'chai';
const expect = chai.expect;

import formatPrice from '../formatPrice';

describe('formatPrice', function () {
  it('should format the price without options', function () {
    const price = 1.23;
    expect(formatPrice(price)).to.equal('&euro; 1,23');
  });

  it('should format the price with thousands seperator', function () {
    const price = 1234.56;
    expect(formatPrice(price)).to.equal('&euro; 1.234,56');
  });

  it('should format the price with another valuta', function () {
    const price = 1234.56;
    expect(formatPrice(price, 2, '&dollar; ')).to.equal('&dollar; 1.234,56');
  });

  it('should format the price with the thousands and decimal seperator inversed', function () {
    const price = 1234.56;
    expect(formatPrice(price, 2, '&euro; ', ',', '.')).to.equal('&euro; 1,234.56');
  });
});
