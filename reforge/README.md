[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A shared dependency for all our front end applications. It includes a host of useful libraries and provides generators to create new applications.

To generate a new app using ```plop```:

```
plop --plopfile ./plopfile.js
```

where plopfile.js is the plopfile provided by this repository.

Once you've created an app, you can add domains to it by running:

```
npm run generate
```

from within the app.

### Config

Reforge apps have a pretty comprehensive webpack config set by default but if you want to add anything, you can create a webpack.config.js file in the base directory that will be required and merged into the Reforge config.

### Scripts

This package creates the following commands: ```reforge:start```, ```reforge:build``` and ```reforge:gen```

Use --help to determine the use of each.
