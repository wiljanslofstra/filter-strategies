import chai from 'chai';
const expect = chai.expect;

import serializeAndRepopulate from '../serializeAndRepopulate';
import formFixture from './fixtures/form';
import formEmptyFixture from './fixtures/form-empty';

describe('serializeAndRepopulate', function () {
  it('should serialize the form with multiple types of input', function() {
    var el = document.createElement('form');
    el.id = 'form';
    el.innerHTML = formFixture;
    document.body.appendChild(el);

    var form = document.getElementById('form');
    var obj = serializeAndRepopulate(form);

    expect(obj).to.deep.equal({
      test: '123',
      'test-select': '234',
      'text-test': '345',
      checkbox: ['2', '3'],
      radio: ['1'],
    });

    var oldForm = document.getElementById('form');
    document.body.removeChild(oldForm);
  });

  it('should repopulate the form with multiple types of input', function() {
    const data = {
      test: '123',
      'test-select': '234',
      'text-test': '345',
      checkbox: ['2', '3'],
      radio: ['1'],
    };

    var el = document.createElement('form');
    el.id = 'form';
    el.innerHTML = formEmptyFixture;
    document.body.appendChild(el);

    var form = document.getElementById('form');
    var obj = serializeAndRepopulate(form, data);

    var serialized = serializeAndRepopulate(form);

    expect(serialized).to.deep.equal({
      test: '123',
      'test-select': '234',
      'text-test': '345',
      checkbox: ['2', '3'],
      radio: ['1'],
    });

    var oldForm = document.getElementById('form');
    document.body.removeChild(oldForm);
  });
});
