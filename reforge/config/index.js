import path from 'path';
import merge from 'webpack-merge';

const config = require(path.join(__dirname,'webpack.config.js'));

export default function(userConfig) {
  if (userConfig) {
    const userConfigPath = path.resolve(process.cwd(), userConfig);
    return merge(config, require(userConfigPath));
  }
  return config;
}
