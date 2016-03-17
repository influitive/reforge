#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const package = require('../package.json');

package['reforge-version'] = 'MANAGED BY PUBLISH';
fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(package, null, 2) + '\n');

