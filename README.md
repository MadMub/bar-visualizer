# Bar Visualizer
A simple, fast, HTML5 WebAudio bar visualizer

# Usage
Written with ES6 import/export syntax, simply import into your JS.
```
import visualizer from './visualizer';

var vis = visualizer(HTMLCanvasElement, HTMLAudioElement, options);
vis.start(); // watch it start
vis.pause(); // animationFrameRequest is canceled, meaning it's paused
```
And in your html
```
<div style="position:relative">
  <canvas style="position:absolute; top:0; left:0" width="0" height="0"></canvas>
</div>
```
## Options
options object is optional, values you see are defaults
```
options = {
  barWidth: 4, // width in pixels of each column in the graph
  barSpacing: 1, // width in pixels of space between the bars
  fftSize: 1024, // size of the fourier transform, should be a power of 2 and between 0 and 2048. The higher the value to more bars in the chart
  resizeDelay: 200 // time in ms to wait before resizing, useful performance gain when making the visualizer responsive
}
```
## Responsiveness
Performant responsiveness is achieved by throttling requests to resize. However it it up to the developer to call resize(). For many the following will suffice.
```
window.addEventListener('resize', vis.resize, false);
```
Note resize() is throttled internally, so no need to do it yourself.
