'use strict';

const d = (str) => { console.log(str); }
const e = (str) => { console.error(str); }

function gamepadTest() {
    const Gamepad = require("node-gamepad");

    const gamepad = new Gamepad("ps4/dualshock4"/* , 3090, 3605 */);
    d(`gamepad=${gamepad}`);
    gamepad.connect();

    gamepad.on("up:press", () => {
        d(`up:press`);
    });

    gamepad.on("down:press", () => {
        d(`down:press`);
    });

    setInterval(() => {
        d(`beep`)
    }, 1000);
}

function nodeHidTest() {
    const HID = require("node-hid");

    // vendorId = 3090, productId = 3605

    // HID.setDriverType("libusb");

    const devices = HID.devices(3090, 3605);
    // for (const device of devices) {
    //     d(device);
    // }

    d(devices);
    if (devices.length == 0) {
        e(`Cannot find anything to use`);
        process.exit(100);
    }

    const device = new HID.HID(devices[0].path);
    
    device.read((err, data) => {
        d(`read: data=${data}`);
    });

    d(`device=${device}`);

    device.on("data", (data) => {
        d(`data=${data}`);
    });

    setInterval(() => {

    }, 1000);
    
}

nodeHidTest();
// gamepadTest();
