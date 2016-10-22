import chai from 'chai';
const expect = chai.expect;

import outputUrlParameters from '../outputUrlParameters';

describe('outputUrlParameters', function () {
  it('should stringify and output the parameters to the url', function () {
    outputUrlParameters({
      test: 123,
    });

    expect(window.location.hash).to.equal('#test=123');
  });

  it('should stringify and output arrays', function () {
    outputUrlParameters({
      options: [1,2,3],
    });

    expect(window.location.hash).to.equal('#options[0]=1&options[1]=2&options[2]=3');
  });

  it('should stringify and output objects', function () {
    outputUrlParameters({
      options: {
        test: '123',
        test2: '321',
      },
    });

    expect(window.location.hash).to.equal('#options[test]=123&options[test2]=321');
  });

  it('should have an empty hash and a search string when requestType is get', function () {
    outputUrlParameters({
      options: {
        test: '123',
        test2: '321',
      },
    }, 'get');

    expect(window.location.hash).to.equal('');
    expect(window.location.search).to.equal('?options[test]=123&options[test2]=321');
  });
});
