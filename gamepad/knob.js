var POWERMATE_PRODUCT_ID = 0x0060;
var POWERMATE_VENDOR_ID = 0x2222;

var powerMateDevice;
var usb = chrome.experimental.usb;

var amount = 0;

var transfer = {
  direction: 'in',
  endpoint: 1,
  length: 6
};

var deviceOptions = {
  onEvent: function(usbEvent) {
    console.log(usbEvent);
    var delta = usbEvent.data[1];
    if (delta & 0x80) {
      amount -= (128 - (delta & 0x7f)) * 4;
    } else {
      amount += delta * 4;
    }

    usb.interruptTransfer(
        powerMateDevice,
        transfer,
        function() {
          console.log('Sent event transfer');
        });
  }
};

usb.findDevice(
    POWERMATE_VENDOR_ID,
    POWERMATE_PRODUCT_ID,
    deviceOptions,
    function(device) {
      if (!device) {
        console.log('device not found');
        return;
      }
      console.log('Found device: ' + device.handle);
      powerMateDevice = device;
      usb.interruptTransfer(powerMateDevice, transfer, function(e) {
        console.log(e)
        console.log('Sent initial transfer');
      });
    });
