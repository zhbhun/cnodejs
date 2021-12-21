const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      /native\/node_modules\/.*/,
    ]),
  },
};
