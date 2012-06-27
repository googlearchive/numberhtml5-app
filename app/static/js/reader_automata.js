var reader_automata=(function() {

const DEBUG=false;
const TIMEOUT=2000;   // reset state if an expected byte takes more than TIMEOUT ms to arrive
const SKIP_ANIM_FRAMES=1;
var state='idle';
var startTime=0;
var readData=[];
var expectedBytes=0;
var counter=0;
var listener;
var checkForAvailableData;
var logState;

var init=function(dataListener, dataChecker, logger) {
  listener=dataListener;
  checkForAvailableData=dataChecker;
  logState=logger;
  resetState();
  read();
}

var resetState=function() {
  changeState('idle');
  readData=[];
  expectedBytes=0;
}

var changeState=function(newState) {
  if (DEBUG) {
    console.log('state change from '+state+' to '+newState);
    if (logState) logState(state, readData, expectedBytes, null);
  }
  state=newState;
}

var read=function(data) {
  // in idle state, don't check on every frame... read buffer should be enough to handle data for a few ms
  if (!(data && data.bytesRead) && state==='idle' && counter++%SKIP_ANIM_FRAMES!==0) {
    window.webkitRequestAnimationFrame(function() {
      checkForAvailableData(read);
    });
    return;
  }

  var now=Date.now();
  if (state!=='idle' && now-startTime>TIMEOUT) {
    if (DEBUG) console.log('timeout - reseting');
    resetState();
  } else if (data && data.bytesRead>0) {
    startTime=now;
    var readByte=new Uint8Array(data.data)[0];
    if (state==='idle') {
      if (readByte>64) {  // no messages should be greater than 64 bytes on bluetooth comm, so this means we lost sync
        if (DEBUG) console.log('invalid data, byte 0='+readByte);
        resetState();
      } else {
        expectedBytes=readByte;
        startTime=now;
        changeState('readingSize');
      }
    } else if (state==='readingSize') {
      if (readByte!==0) {  // no messages should be greater than 64 bytes on bluetooth comm, so this means we lost sync
        if (DEBUG) console.log('invalid data, byte 1='+readByte);
        resetState();
      } else {
        // simply ignore this byte, since it should always be 0 
        // expectedBytes+=readByte<<8;
        changeState('reading');
      }
    } else if (state==='reading') {
      readData.push(readByte);
      if (readData.length===expectedBytes) {
        if (DEBUG) console.log('got whole package: '+readData);
        if (listener) listener(readData);
        resetState();
      }
    }
  } else {
    // data is null or no bytes read...
    window.webkitRequestAnimationFrame(function() {
      checkForAvailableData(read);
    });
    return;
  }
  if (logState) logState(state, readData, expectedBytes, state==='idle'?'':(TIMEOUT-(now-startTime)));
  checkForAvailableData(read);
}

return {"init": init, "isIdle": function() {return state==='idle'}};

})();

