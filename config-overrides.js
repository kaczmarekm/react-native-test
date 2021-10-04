import path from 'path';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';

module.exports = {
  paths: function (paths, env) {
    paths.appIndexJs = path.resolve(__dirname, './index.js');
    return paths;
  },
  webpack: function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin),
    );
    return config;
  },
};
