#!/usr/bin/env node
const chalk = require('chalk');
const includes = require('lodash.includes');
const spawn = require('child_process').spawnSync;
const path = require('path');

const argv = require('yargs')
  .usage('Usage: reforge-cli <command> [options]')
  .command('new', 'create a new app or domain')
  .demand(1)
  .argv;

const error = message => console.log(chalk.red(message));
const validCommands = ['new'];
const command = argv._[0];

if (!includes(validCommands, command)) {
  error(`<command> must be one of ${validCommands}`);
  process.exit(1);
}

if (command === 'new') {
  spawn(require.resolve('plop'), ['--plopfile', path.join(__dirname, './plopfile.js')], {stdio: 'inherit'});
}
