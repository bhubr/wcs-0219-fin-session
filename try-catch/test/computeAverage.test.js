const assert = require('assert');
const computeAverage = require('../computeAverage');

describe('test computeAverage', () => {
  describe('Working cases', () => {
    it('returns 3 for the numbers from 1 to 5', () => {
      const average = computeAverage([1, 2, 3, 4, 5]);
      assert.strictEqual(average, 3);
    });
  });

  describe('Failing cases', () => {
    it('throws an error if the input is NOT an array', () => {
      assert.throws(() => computeAverage(), {
        message: 'Expected an array'
      });
    });
    it('throws an error if the input an EMPTY array', () => {
      assert.throws(() => computeAverage([]), {
        message: 'Input array should not be empty'
      });
    });
    it('throws an error if the input contains a NaN value', () => {
      assert.throws(() => computeAverage([1, 2, 'Fail']), {
        message: 'Encountered not-a-number: "Fail" at index 2'
      });
    });
  });
});