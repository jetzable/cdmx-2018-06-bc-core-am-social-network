// Configura tus test para usarlos
global.window = global;
global.assert = require('chai').assert;
require('../src/js/index.js');
require('./data.spec.js');
