const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');

module.exports = [
  rucksack,
  nested,
  autoprefixer
];