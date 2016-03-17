const path = require('path');
const spawnSync = require('child_process').spawnSync;
const confirm = require('inquirer-confirm');

const basePath = path.resolve('.');
module.exports = {
  description: 'Create a new app',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the app name?'
    }
  ],

  actions: [
    {
      type: 'add',
      path: basePath + '/src/app.js',
      templateFile: 'plop/templates/app/src/app.js'
    },{
      type: 'add',
      path: basePath + '/.babelrc',
      templateFile: 'plop/templates/app/.babelrc'
    },
    {
      type: 'add',
      path: basePath + '/.eslintrc',
      templateFile: 'plop/templates/app/.eslintrc'
    },
    {
      type: 'add',
      path: basePath + '/.gitignore',
      templateFile: 'plop/templates/app/.gitignore'
    },
    {
      type: 'add',
      path: basePath + '/package.json',
      templateFile: 'plop/templates/app/package.json'
    },
    {
      type: 'add',
      path: basePath + '/main.js',
      templateFile: 'plop/templates/app/main.js'
    },
    () => {
      confirm('Would you like to install dependencies now?')
        .then(() => spawnSync('npm', ['i'], { stdio: 'inherit'}))
    }

  ]
};
