'use strict';

var I2C = require('i2c-bus');

/*
  this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
*/
function makeI2CWrapper(port, address, debug) {
  var debug   = debug;
  var address = address
  
      
  try {
    var i2c = new I2C.openSync(port);
  } catch (er) {
    return console.error(er);
  }
 
  var readBytes = function readBytes(cmd, length) {
    return new Promise(function (resolve, reject) {
      let buf = Buffer.alloc(length);
      try {
        i2c.readI2cBlock(address, cmd, length, buf, function (error, data) {
          if (error) {
            return reject(error);
          }
          resolve(data);
        });
      } catch (er) {
        return reject(er);
      }
    });
  };

  var writeBytes = function writeBytes(cmd, buf) {
    if (!(buf instanceof Array)) {
      buf = [buf];
    }
    if ((buf instanceof Array)) {
      buf = Buffer(buf);
    }
   // if (debug) {
      console.log('adress '+address.toString(16) + ', cmd ' + cmd.toString(16) + ', values ' + JSON.stringify(buf.values()));
  //  }
    return new Promise(function (resolve, reject) {
      try {
        i2c.writeI2cBlock(address, cmd, buf.length, buf, function (error, data) {
          if (error) {
            return reject(error);
          }
  
          resolve(data);
        });
      } catch (er) {
        return reject(err);
      }
    });
  };

  return {
    readBytes: readBytes,
    writeBytes: writeBytes
  };
}

module.exports = makeI2CWrapper;