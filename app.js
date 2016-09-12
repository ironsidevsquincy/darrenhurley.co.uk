require('babel-register')({
    plugins: [
        require.resolve('babel-plugin-transform-es2015-modules-commonjs')//,
        // require.resolve('babel-plugin-transform-object-assign')
    ],
    presets: [
        require.resolve('babel-preset-es2015')
    ]
});
require('babel-polyfill');

require('./server/init');
