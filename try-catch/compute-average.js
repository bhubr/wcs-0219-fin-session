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

try {
  const numbers = process.argv.slice(2);
  const average = computeAverage(numbers);
  console.log('average', average);
  // console.log(computeAverage([1, 2, 3]));
  // console.log(computeAverage([]));
  // console.log(computeAverage());
  // console.log(computeAverage([1, 2, 3, '4', 'salut']));
} catch (err) {
  console.error(err);
  // process.exit(1);
}
console.log('la suite s\'execute normalement');
// process.exit();