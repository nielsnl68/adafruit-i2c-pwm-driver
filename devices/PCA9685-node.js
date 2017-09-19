/**
 * Copyright Bradley Smith, bradley.1.smith@gmail.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function (RED) {

  'use strict';
  // require any external libraries we may need....
  // Node.js Imports
  const os = require('os');
  // NPM Imports
  const i2c = require('../src/PCA9685.js');
  
  let pwmDriver = undefined;
  
  function init (config) {
    if (pwmDriver == undefined) {
      pwmDriver = new PCA9685(1,config.address, false);
      pwmDriver.init()
      .then( function () {pwmDriver.setPWMFreq(config.pwmfreq);} )
      .catch(console.error);
    }
    return pwmDriver;  
          
  }

  function pca9685out(config) {

    RED.nodes.createNode(this, config);
    let node = this;

    // 1. Process Config
    node.debugMode = (config && config.debugMode);
    
    pwmDriver = this.init(config);
    
    node.on("input", function(msg) {
      var address = node.address; 
      if (isNaN(address)) address = msg.address;
      var channel = node.channel;
      if (isNaN(channel)) channel = msg.channel;

      address = parseInt(address);
      channel = parseInt(channel);
      
      off = number(msg.payload);
      
      pwmDriver.setPWM(channel, 0, off)// channel, on , off
  
      
      
    }
  }

  RED.nodes.registerType("pca9685", pca9685out);

}