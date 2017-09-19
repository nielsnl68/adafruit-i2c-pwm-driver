const I2C = require('i2c-bus')

/*
  this wrappers wraps the i2c readBytes, writeBytes functions and returns promises
*/
function I2CWrapper (port, address, debug) {
  const i2c = I2C.openSync(port);
  const address = address;
  const debug = debug;
    
  const readBytes = (cmd, length) => {
	let buf = Buffer.alloc(length)
    return new Promise(
      function (resolve, reject) {
        i2c.i2cRead(this.address, cmd, length, buf, function (error, data) {
          if (error) {
            return reject(error)
          }
          resolve(data)
        })
      }
    )
  }

  const writeBytes = (cmd, buf) => {
    if (!(buf instanceof Array)) {
      buf = [buf]
    }
	buf = new Buffer(buf);
    if(debug){
      console.log(`cmd ${cmd.toString(16)} values ${buf}`)
    }
    return new Promise(
      function (resolve, reject) {
        i2c.i2cWrite(this.address, cmd, buf.length, buf, function (error, data) {
          if (error) {
            return reject(error)
          }
          resolve(data)
        })
      }
    )
  }

  return {
    readBytes,
    writeBytes
  }
}

module.exports = I2CWrapper
