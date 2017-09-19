# Adafruit I2C PWM Driver 

Node-red implementation for different i2c-device like the Adafruit 16-Channel 12-bit PWM/Servo Driver
http://www.adafruit.com/products/815

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Installation

```
npm i node-red-contrib-i2c-devices
```


## Usage of Adafruit I2C PWM Driver node 

* Add the node on your worksheet, 
* set the default i2c address (optionaly you can set it using the `msg.address`).
* set the PWMfrequency in hertz (default this is set to 60 Hertz)
* set optionally the channel to change (or use `msg.channel`).

To configure I2c on your Raspberry-pi / Beaglebone please see [here](https://npmjs.org/package/i2c-bus)


### Input msg

* [Opt.] i2c address as `msg.address`
* [Opt.] pwm channel as `msg.channel`
* `msg.payload` is the value that is send to the pwm-device (value between 0 to 4048).

### Output msg

This node can be daisychained the message is the same as the input msg.


## Contribute

PRs accepted.

Small note: If editing the Readme, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.


## License
MIT

Based on the [Adafruit's Raspberry-Pi Python Code Library](https://github.com/adafruit/Adafruit-Raspberry-Pi-Python-Code.git)

>  Here is a growing collection of libraries and example python scripts
>  for controlling a variety of Adafruit electronics with a Raspberry Pi

>  In progress!
>
>  Adafruit invests time and resources providing this open source code,
>  please support Adafruit and open-source hardware by purchasing
>  products from Adafruit!
>
>  Written by Limor Fried, Kevin Townsend and Mikey Sklar for Adafruit Industries.
>  BSD license, all text above must be included in any redistribution
>
>  To download, we suggest logging into your Pi with Internet accessibility and typing:
>  git clone https://github.com/adafruit/Adafruit-Raspberry-Pi-Python-Code.git

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
