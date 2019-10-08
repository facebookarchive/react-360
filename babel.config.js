'use strict';

module.exports = {
  ignore: [
    '**/Yoga.bundle.js',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-transform-modules-commonjs',
  ],
  presets: [
    '@babel/preset-react',
  ],
};
