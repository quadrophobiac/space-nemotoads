var serialport = require('serialport');

var connections = ["/dev/cu.usbmodem1411","/dev/cu.usbmodem1421","/dev/tty.usbmodemfa131"];
var portName = connections[0];
var sp = new serialport.SerialPort(portName, {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline("\r\n")
});

sp.on('data', function(input) {
    console.log(input);
});