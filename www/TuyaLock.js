const exec = require('cordova/exec');

const listeners = {}; // eventName -> Set<fn>

function addListener(eventName, fn){
  if(!listeners[eventName]) listeners[eventName] = new Set();
  listeners[eventName].add(fn);
}
function removeListener(eventName, fn){
  listeners[eventName]?.delete(fn);
}
function _dispatch(eventName, payload){
  (listeners[eventName] || []).forEach(fn => {
    try { fn(payload); } catch(e){}
  });
}

// Native will push events through this hidden action:
exec((evt)=>{
  if(evt && evt.event) _dispatch(evt.event, evt.data);
}, console.error, 'TuyaLock', '_eventStream', []);

const TuyaLock = {
  init: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','init',[o])),
  ensurePermissions: ()=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','ensurePermissions',[])),
  loginWithEmail: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','loginWithEmail',[o])),
  scanBle: ()=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','scanBle',[])),
  bindBleDevice: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','bindBleDevice',[o])),
  unlock: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','unlock',[o])),
  addPin: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','addPin',[o])),
  deletePin: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','deletePin',[o])),
  listPins: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','listPins',[o])),
  getUnlockLogs: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','getUnlockLogs',[o])),
  startEvents: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','startEvents',[o])),
  stopEvents: (o)=>new Promise((res,rej)=>exec(res,rej,'TuyaLock','stopEvents',[o])),

  on: addListener,
  off: removeListener,
};

module.exports = TuyaLock;


