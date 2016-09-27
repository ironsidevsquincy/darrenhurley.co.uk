require('babel-register')({
    presets: [
        require.resolve('babel-preset-es2015')
    ]
});
require('array.prototype.find').shim();
require('es6-object-assign').polyfill();
require('es6-promise').polyfill();

require('./server/init');
