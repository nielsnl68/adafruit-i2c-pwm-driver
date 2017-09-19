'use strict';

var I2C = require('i2c-bus');

/*
  this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
*/
function makeI2CWrapper(address, _ref) {
  var device = _ref.device,
      debug = _ref.debug;
      

  var i2c = new I2C.openSync(1);

  var readBytes = function readBytes(cmd, length) {
    return new Promise(function (resolve, reject) {
      let buf = Buffer.alloc(length);
      i2c.readBytes(address, cmd, length, buf, function (error, data) {
        if (error) {
          return reject(error);
        }
        resolve(data);
      });
    });
  };

  var writeBytes = function writeBytes(cmd, buf) {
    if (!(buf instanceof Array)) {
      buf = [buf];
    }
    buf = Buffer(buf);
    if (debug) {
      console.log('cmd ' + cmd.toString(16) + ' values ' + buf);
    }
    return new Promise(function (resolve, reject) {
      i2c.writeBytes(cmd, buf.length, buf, function (error, data) {
        if (error) {
          return reject(error);
        }

        resolve(data);
      });
    });
  };

  return {
    readBytes: readBytes,
    writeBytes: writeBytes
  };
}

module.exports = makeI2CWrapper;