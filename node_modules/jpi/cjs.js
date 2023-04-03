// Wrap library with esm for CommonJS compatibility.
const esmRequire = require('esm')(module);
module.exports = esmRequire('./lib');
