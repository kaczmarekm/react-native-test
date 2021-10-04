module.exports = {
  plugins: [
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ],
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react',
    '@babel/preset-env',
  ],
};
