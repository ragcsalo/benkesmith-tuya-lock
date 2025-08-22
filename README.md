# benkesmith-tuya-lock

A Cordova plugin that provides methods for controlling Tuya-compatible Bluetooth padlocks using the Tuya Smart Lock SDK.

## Features

- Initialize the Tuya SDK with your project credentials (Client ID, Client Secret, Schema)
- Log in with an existing Tuya/Smart Life user account
- Scan and bind Tuya BLE locks
- Unlock the lock via Bluetooth
- Add, list, and delete PIN codes
- Retrieve unlock logs and failed attempts
- Subscribe to real-time device events (unlock, wrong password attempts, tamper alerts, etc.)

## Installation

You can install this plugin from a local path or directly from the GitHub repository:

```bash
cordova plugin add https://github.com/ragcsalo/benkesmith-tuya-lock.git

## Usage

```js
// Initialize the SDK
await TuyaLock.init({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  schema: 'YOUR_APP_SCHEMA'
});

// Ensure permissions (Android 12+)
await TuyaLock.ensurePermissions();

// Log in with an existing Tuya/Smart Life user
await TuyaLock.loginWithEmail({
  countryCode: '36',
  email: 'you@example.com',
  password: 'yourpassword'
});

// Scan for locks
const devices = await TuyaLock.scanBle();

// Bind a device (first time only)
await TuyaLock.bindBleDevice({
  uuid: devices[0].uuid,
  productId: devices[0].productId
});

// Unlock
await TuyaLock.unlock({ deviceId: devices[0].deviceId });

// Add a PIN
await TuyaLock.addPin({
  deviceId: devices[0].deviceId,
  code: '123456',
  name: 'DemoCode',
  startAt: 0,
  endAt: 0
});

// Subscribe to events
TuyaLock.on('deviceUpdate', evt => {
  console.log('Lock event:', evt);
});
await TuyaLock.startEvents({ deviceId: devices[0].deviceId });

// Get unlock logs
const logs = await TuyaLock.getUnlockLogs({
  deviceId: devices[0].deviceId,
  page: 0,
  size: 20
});

## Notes

- You must create a Tuya IoT project and obtain **Client ID**, **Client Secret**, and **Schema** from the [Tuya IoT Platform](https://iot.tuya.com/).
- The lock must be bound to your Tuya account at least once in order to enable local BLE unlock.
- On Android 12 and above, the app must request runtime Bluetooth permissions.

