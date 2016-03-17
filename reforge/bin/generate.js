#! /usr/bin/env node
const path = require('path');
const spawn = require('child_process').spawn;
const fs = require('fs');

const program = require('commander');
const pkg = require(path.join(__dirname, '..', 'package.json'));

program
  .version(pkg.version)
  .usage('[options]')
  .option('-t, --type [type]', 'Type of object to generate.')
  .parse(process.argv);

// First check to see if plop is installed locally
var plop = path.join('.','node_modules','plop','plop.js');
try {
  fs.accessSync(plop);
} catch (e) {
  plop = path.join(__dirname,'..','node_modules','plop','plop.js');
}

const plopfile = path.join(__dirname, '..', 'plopfile.js');
const initialArgs = program.type ? [program.type] : [];
const plopArgs = initialArgs.concat('--plopfile').concat(plopfile);

spawn(plop, plopArgs, {stdio: 'inherit'});
