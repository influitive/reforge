#! /usr/bin/env node
require('babel-register')({
  only: /reforge\/config/
});

const path = require('path');
const kotatsu = require('kotatsu');
const program = require('commander');
const pkg = require(path.join(__dirname, '..', 'package.json'));

program
  .version(pkg.version)
  .usage('[options]')
  .option('-c, --config [configPath]', 'Webpack config to be merge into reforge\'s config')
  .parse(process.argv);

process.env.NODE_ENV = 'production';
process.env.TARGET = 'build';

const buildConfig = require(path.join(__dirname,'..','config')).default;

kotatsu.build('front', {
  config: buildConfig(program.config),
  babel: true,
  minify: true
});
