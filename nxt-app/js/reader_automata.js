var reader_automata=(function() {

const DEBUG=false;
const TIMEOUT=500;   // reset state if an expected byte takes more than TIMEOUT ms to arrive
const SKIP_ANIM_FRAMES=10;
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
    window.webkitRequestAnimationFrame(read);
    return;
  }

  var now=Date.now();
  if (state!=='idle' && now-startTime>TIMEOUT) {
    resetState();
  } else if (data && data.bytesRead>0) {
    startTime=now;
    var readByte=new Uint8Array(data.data)[0];
    readData.push(readByte);
    if (state==='idle') {
      expectedBytes=readByte;
      startTime=now;
      changeState('readingSize');
    } else if (state==='readingSize') {
      expectedBytes+=readByte<<8;
      changeState('reading');
    } else if (state==='reading') {
      if (readData.length===expectedBytes+2) {
        var data=readData;
        if (listener) listener(data);
        resetState();
      }
    }
  } else {
    // data is null or no bytes read...
    checkForAvailableData(read);
    return;
  }
  if (logState) logState(state, readData, expectedBytes, state==='idle'?'':(TIMEOUT-(now-startTime)));
  window.webkitRequestAnimationFrame(read);
}

return {"init": init, "isIdle": function() {return state==='idle'}};

})();

