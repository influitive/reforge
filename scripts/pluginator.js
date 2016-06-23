#!/usr/bin/env node
'use strict';
require('dotenv').config({ silent: true });
const chalk = require('chalk');
const values = require('lodash.values');
const axios = require('axios');
const urlJoin = require('url-join');
const path = require('path');

const assets = require(path.resolve(process.cwd(), 'build/manifest.json'));
const logError = text => console.error(chalk.red(text));

const mapAssets = assets => values(assets)
  .map(file => urlJoin(process.env.CDN_URL, file))
  .filter(filename => /\.(css|js)$/.test(filename));

const payload = {
  version: 2,
  active: true,
  assets: {
    default: mapAssets(assets)
  }
};

axios({
  url: process.env.PLUGINATOR_URL,
  method: 'post',
  data: payload,
  auth: {
    username: process.env.PLUGINATOR_USER,
    password: process.env.PLUGINATOR_PASS
  }
})
.then(() => {
  console.log(chalk.green('SUCCESS: You published a plugin with the following files:'));
  for (let context in payload.assets) {
    console.log(chalk.yellow(context + ':'));
    for (let file of payload.assets[context]) {
      console.log('    ' + chalk.magenta.underline(file));
    }
  }
})
.catch((e) => {
  logError(`${e.status}: ${e.statusText}`);
  process.exit(1);
});

