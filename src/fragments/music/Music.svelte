<script>
  import { onMount } from "svelte";

  onMount(() => {
    var audio = document.getElementById("audio");
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 32;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var ctx = document.getElementById("canvas").getContext("2d");
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var barWidth = (WIDTH * 0.8) / (bufferLength - 5);
    var barGap = (WIDTH * 0.2) / (bufferLength - 5);
    let t = 0;
    let arr = [];
    function renderFrame() {
      requestAnimationFrame(renderFrame);
      var x = 0;
      analyser.getByteFrequencyData(dataArray);
      let u = (HEIGHT / dataArray[0]) * 0.66;
      let e = HEIGHT / 10;
      let num = 0;
      for (var i = 0; i < bufferLength; i++) {
        num += dataArray[i];
      }
      arr.unshift(num / 16);
      if (t % 2 === 0) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < dataArray.length - 5; i++) {
          let mutator = 0;
          arr[0] ? (mutator = arr[0]) : (mutator = 0);
          let barHeight = (dataArray[i] + mutator / 2) * u;

          ctx.fillStyle = "#a9e3b0";
          ctx.fillRect(x, e, barWidth, barHeight + e);
          x += barWidth + barGap;
        }
      }
      t++;
      num = 0;
      if (arr.length > 15) {
        arr.pop();
      }
    }
    renderFrame();
  });

  let playing = false;
</script>

<style>
  div {
    /* height: 75%; */
    /* width: 2em; */
    /* background: url("/img/music-player.svg");
    background-size: contain;
    background-repeat: no-repeat; */
  }

  canvas {
    width: 100%;
    height: 100%;
    transform: rotateZ(180deg);
    border-top: 1rem solid #a9e3b0;
  }

  .equalizer {
    height: 70%;
  }
</style>

<div class="equalizer">
  <canvas id="canvas" />
</div>
