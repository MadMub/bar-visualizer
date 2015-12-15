function visualizer(audio, canvas, options) {
  if(!audio || !canvas)
    return console.log('Please pass in an audio and canvas node');
  // setup visualizer
  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  var canvasCtx = canvas.getContext('2d');
  var analyzer = audioCtx.createAnalyser();
  var source = audioCtx.createMediaElementSource(audio);
  source.connect(analyzer);
  source.connect(audioCtx.destination);
  var animationRequest = null;
  var resizeTimeoutRequest = null;
  // process options
  options = options || {};
  var barWidth = options.barWidth || 4;
  var barSpacing = options.barSpacing || 1;
  analyzer.fftSize = options.fftSize || 1024;
  var resizeDelay = options.resizeDelay || 200;
  // more setup
  var bufferLength = analyzer.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  function render() {
    animationRequest = requestAnimationFrame(render);
    var width = canvas.width;
    var height = canvas.height;
    var x = 0;
    var barHeight;
    var energy;
    canvasCtx.clearRect(0, 0, width, height);
    analyzer.getByteFrequencyData(dataArray);
    for(var i = 0; x + barWidth + barSpacing < width && i < bufferLength; i++) {
      energy = dataArray[i] - 128;
      barHeight = Math.round(energy / 127.0 * height);
      canvasCtx.fillStyle = 'rgb(82, 139,' + dataArray[i] + ')';
      canvasCtx.fillRect(x, height - barHeight, barWidth, height);
      x += barWidth + barSpacing;
    }
  }

  function updateSize() {
    canvas.height = canvas.parentNode.clientHeight;
    canvas.width = canvas.parentNode.clientWidth;
  }

  var instance = {};
  instance.pause = function() {
    if (animationRequest) {
      cancelAnimationFrame(animationRequest);
      animationRequest = null;
    }
  };

  instance.start = function() {
    console.log('resizing visualizer');
    updateSize();
    render();
  };

  instance.resize = function() {
    instance.pause();
    clearTimeout(resizeTimeoutRequest);
    resizeTimeoutRequest = setTimeout(instance.start, resizeDelay);
  };

  return instance;
}


export default visualizer;
