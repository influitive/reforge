const kebab = require('lodash.kebabcase');
const pkg = require('./package.json');

module.exports = (plop) => {
  plop.addHelper('upperCase', text => {
    return text.toUpperCase();
  });

  plop.addHelper('upperCaseDashed', text => {
    return kebab(text).toUpperCase();
  });

  plop.addHelper('reforge-version', () => {
    return pkg['reforge-version'];
  });
  plop.setGenerator('app', require('./plop/generators/app'));
  plop.setGenerator('domain', require('./plop/generators/domain'));
};
