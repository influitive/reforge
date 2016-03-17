const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const confirm = require('inquirer-confirm');

const deps = {
  "react": "^0.14.7",
  "react-container-query": "^0.3.0",
  "react-dom": "^0.14.7",
  "react-lite": "^0.15.0",
  "react-redux": "^4.4.0",
  "react-router": "^2.0.0",
  "react-router-redux": "^4.0.0",
  "redux": "^3.3.1",
  "redux-saga": "^0.9.3",
  "redux-thunk": "^2.0.1",
  "reselect": "^2.1.0",
  "reforge": "0.0.2-rc1"
};

module.exports = () => {
  confirm('Would you like reforge-runtime to add it\'s peerDeps to your package.json? (Recommended)')
    .then(() => {
      const package = require(path.join(process.cwd(), 'package.json'));
      package.dependencies = Object.assign({}, package.dependencies, deps);
      fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(package, null, 2));

      confirm('Would you like to install them now?')
        .then(() => {
          spawn('npm', ['install'], { stdio: 'inherit' });
        })
    }, () => console.log('Why\'d you wake me up?'));
};

