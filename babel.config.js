const path = require('path');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/assets': path.resolve(__dirname, 'assets'),
            '@': path.resolve(__dirname, 'src'),
            'tailwind.config': path.resolve(__dirname, 'tailwind.config.js'),
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
