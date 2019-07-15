const computeAverage = require('./computeAverage');
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
  console.error('Veuillez fournir des nombres à la suite de node runComputeAverage');
  process.exit(1);
}
console.log('la suite s\'execute normalement');
// process.exit();