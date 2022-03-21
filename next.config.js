/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
/**
 * @type {import('next').NextConfig}
 **/

const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './src/styles/antd.less',
  lessVarsFilePathAppendToEndOfContent: false,

  experimental: {
    outputStandalone: true,
  },

  webpack(config) {
    return config;
  },
});
