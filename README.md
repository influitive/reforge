## Config ##

### Webpack ###

Reforge provides a default webpack config that SHOULD work with your environment
but you can always import the config and modify it as you see if. Currently it makes
the following assumptions:

#### Environment Variables ####
*NODE_ENV: ```development``` or ```production```
*CDN_URL: The base url that will be used to find the produced javascript files.
*SERVICE_URL: The entry API endpoint. Usually very applciation specific.

#### CSS ####
All CSS is in the form of CSS modules and using postcss (albeit with no plugins by default).

### PostCSS Configuration ###

We've provided some basic postcss plugins to use: ```rucksack, nested, and autoprefixer```

To configure your webpack to use postcss, you can modify your webpack config like so:

Your webpack config:
```js
const config = require('reforge/config/webpack.config');

config.postcss = require('reforge/config/postcss-plugins');

module.exports = config;
```

In order modify the plugins being used, you'll need to concat new plugins to those provided
by reforge/config/postcss-plugins.
For example, to add ```partial-import``` to the end of the postcss plugin chain, you can
do the following:

```js
const partialImport = require('postcss-partial-import');

...
config.postcss = config.postcss.concat(partialImport);
```

Note that order of plugins *DOES* matter so make sure to be careful how you order these.


## Scripts ##

There are a few scripts available from reforge as well.

### Pluginator ###

This script will use some environment variables (PLUGINATOR_URL, PLUGINATOR_USER, PLUGINATOR_PASS) to
publish your project to a pluginator instance. This script also assumes that your
build directory is ```./build``` and contains a properly formatted manifest.json file.

## Utilities ##

These are intended to be used to simplify some of the tasks done by reforge clients. To use them, just destructure what
you need from the main 'reforge' package like so:

```js
import { connectProvidersToDevTools } from 'reforge';
```

### connectProvidersToDevTools ###

This function takes an object where the each key/object pair is a provider description, built for use by react-redux-provide.
Sets up redux devtools on all the providers included.