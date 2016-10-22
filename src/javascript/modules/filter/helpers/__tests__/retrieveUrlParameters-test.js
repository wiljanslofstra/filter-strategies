import chai from 'chai';
const expect = chai.expect;

import retrieveUrlParameters from '../retrieveUrlParameters';

describe('retrieveUrlParameters', function () {
  it ('should retrieve an empty object when no hash is set', function () {
    window.location.hash = '';
    const obj = retrieveUrlParameters();
    expect(obj).to.deep.equal({});
  });

  it ('should retrieve an object from the hash', function () {
    window.location.hash = 'options[0]=1&options[1]=2&options[2]=3';
    const obj = retrieveUrlParameters();
    expect(obj).to.deep.equal({ options: ['1', '2', '3'] });
  });

  it ('should retrieve an object from the hash with mixed values', function () {
    window.location.hash = 'test=test123&options[0]=1&options[1]=2&options[2]=3';
    const obj = retrieveUrlParameters();
    expect(obj).to.deep.equal({ test: 'test123', options: ['1', '2', '3'] });
  });
});
