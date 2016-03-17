#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const version = require('../../reforge/package.json').version;
const package = require('../package.json');

package['reforge-version'] = version;
fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(package, null, 2) + '\n');
