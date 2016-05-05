var cylon = require('cylon');

cylon.robot({
  name: 'myBot',
  connections: {
    arduino: { adaptor: 'firmata', port: process.env.PORT }
  },
  devices: {
    tremors:  { driver: 'analogSensor',  pin: 0, connection: 'arduino' },
    button:   { driver: 'button',        pin: 2, connection: 'arduino' },
    redLight: { driver: 'led',           pin: 4, connection: 'arduino' }
  },
  detectTremors: function(val) {
    console.log(val);
    // var my = this;
    if(val > 1000) {
      this.redLight.turnOn();
    }
  },
  work: function(my) {
    console.log('work');
    my.tremors.on('analogRead', function(val) {
      my.detectTremors(val);
    });

    my.button.on('push', function() {
      my.redLight.turnOff();
    });
  }
}).start();
