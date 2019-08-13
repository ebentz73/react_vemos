module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-styled-components',
      {
        ssr: false
      }
    ],
    [
      'module-resolver',
      {
        root: [__dirname],
        cwd: __dirname,
        alias: {
          '@root': './',
          '@assets': './src/assets',
          '@config': './config',
          '@constants': './src/constants',
          '@services': './src/services',
          '@styles': './src/styles',
          '@components': './src/components',
          '@containers': './src/containers',
          '@pages': './src/pages',
          '@redux': './src/redux',
          '@api': './src/api',
          '@utils': './src/utils'
        }
      }
    ]
  ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    },
    production: {
      plugins: ['transform-react-remove-prop-types']
    }
  }
};
