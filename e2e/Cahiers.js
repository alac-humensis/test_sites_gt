require = require('@std/esm')(module)

var cahiers = require('../src/sites/Cahiers.mjs');
module.exports = cahiers.genNodeExport();