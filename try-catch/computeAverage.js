function computeAverage(numbers) {
  if (!Array.isArray(numbers)) {
    throw new Error('Expected an array');
  }
  if (numbers.length === 0) {
    throw new Error('Input array should not be empty');
  }
  let sum = 0;
  for (let i = 0 ; i < numbers.length ; i += 1) {
    const number = Number(numbers[i]);
    if (Number.isNaN(number)) {
      throw new Error(`Encountered not-a-number: ${number} at index ${i}`);
    }
    sum += number;
  }
  return sum / numbers.length;
}

module.exports = computeAverage;
