const slugify = require('slugify');

const title = 'Why JavaScript is the best language';
const slug = slugify(title, {
  lower: true, remove: '!?'
});

console.log(slug);