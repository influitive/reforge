#! /usr/bin/env node
// Allows ES6 in configs
require('babel-register')({
  only: /reforge\/config/
});
const path = require('path');
const kotatsu = require('kotatsu');

process.env.TARGET = 'start';

const buildConfig = require(path.join(__dirname,'..','config')).default;

const program = require('commander');
const pkg = require(path.join(__dirname, '..', 'package.json'));

program
  .version(pkg.version)
  .usage('[options]')
  .option('-c, --config []', 'Webpack config to be merge into reforge\'s config')
  .option('-p, --public []', 'A public folder that will be hosted on local along with the application.')
  .option('-e, --entry [./main.js]',
    'The entry file for serving.',
    './main.js')
  .parse(process.argv);

const publicPaths = program.public ?
  [].concat(program.public).map(function(p) {
    return path.resolve(p);
  }) :
  null;

kotatsu.serve({
  entry: program.entry,
  config: buildConfig(program.config),
  progress: true,
  devtool: '#eval-source-map',
  babel: true,
  public: publicPaths
});
