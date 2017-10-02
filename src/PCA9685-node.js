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

  // NPM Imports
  const PCA9685 = require("./PCA9685.js");
  
  let pwmDriver = undefined;
  
  function init (config) {
    if (pwmDriver == undefined) {
      pwmDriver = new PCA9685(1, config.address, false);
      pwmDriver.init()
      .then( () => pwmDriver.setPWMFreq(config.pwmfreq) )
      .catch(console.error);
    }
    return pwmDriver;  
          
  }

  function pca9685out(config) {

    RED.nodes.createNode(this, config);
    var node = this;
    
    node.channel = config.channel;
    node.rules   = config.rules;
    if ( typeof node.rules   === 'undefined'){
       node.rules = [];
    }
    node.minout  =    0;
    node.maxout  = 4048;

    pwmDriver = init(config);
    
    node.on("input", function(msg) {
      var channel;
      if (msg.hasOwnProperty("channel")) { 
        channel = msg.channel; 
      } else {
        channel = node.channel ;
      }

      channel = Number(channel);

      var n = Number(msg.payload);
      if (n <   0) { n = 0; }
      if (n > 255) { n = 255; }
                    
//                    if (node.action == "roll") {
//                        var divisor = node.maxin - node.minin;
//                        n = ((n - node.minin) % divisor + divisor) % divisor + node.minin;
//                    }
      var rule = node.rules[channel];
      if (typeof node.rules[channel] === 'undefined'){
         rule = {smooth:false, minout:0, maxout:4048};
      }          

      var out = ((n / 255) * (Number(rule.maxout) - Number(rule.minout))) + Number(rule.minout);
      out = Math.round(out); 
      node.log([channel, out, rule.maxout , rule.minout]);
      pwmDriver.setPWM(channel, 0, out)// channel, on , off
      
    });
  }

  RED.nodes.registerType("PCA9685", pca9685out);

}