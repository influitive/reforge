const path = require('path');

const basePath = path.resolve('./src');
module.exports = {
  description: 'Create a new domain',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the Domain name?'
    }
  ],

  actions: [
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/index.js',
      templateFile: 'plop/templates/domain/index.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/components/{{ dashCase name }}.js',
      template: 'import React from \'react\';\n// put presentational components in here, connect them in your index.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/action-types.js',
      templateFile: 'plop/templates/domain/action-types.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/actions.js',
      templateFile: 'plop/templates/domain/actions.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/constants.js',
      templateFile: 'plop/templates/domain/constants.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/reducer.js',
      templateFile: 'plop/templates/domain/reducer.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/reducer.test.js',
      templateFile: 'plop/templates/domain/reducer.test.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/sagas.js',
      templateFile: 'plop/templates/domain/sagas.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/sagas.test.js',
      templateFile: 'plop/templates/domain/sagas.test.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/selectors.js',
      templateFile: 'plop/templates/domain/selectors.js'
    },
    {
      type: 'add',
      path: basePath + '/{{dashCase name}}/selectors.test.js',
      templateFile: 'plop/templates/domain/selectors.test.js'
    }
  ]
};
