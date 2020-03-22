<script>
  import { onMount } from "svelte";

  const draw = () => {
    let contextFunction =
      window.AudioContext || // Default
      window.webkitAudioContext || // Safari and old versions of Chrome
      false;

    var context = new contextFunction();

    var audio = document.getElementById("audio");
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
      var x = 0;
      analyser.getByteFrequencyData(dataArray);
      let e = HEIGHT / 10;
      let num = 0;
      for (var i = 0; i < bufferLength; i++) {
        num += dataArray[i];
      }
      arr.unshift(num / 16);
      if (t % 2 === 0) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        let gap = [];
        let arrlen = dataArray.length - 6;
        let midway = arrlen / 2;
        let mut = 0.6;
        for (var i = 0; i < arrlen; i++) {
          let percentLoud = dataArray[i] / 255;
          let amp = dataArray[i];
          mut += 0.05;
          if (i >= 3) mut = 1;
          ctx.fillStyle = "#2a333e";
          ctx.fillRect(
            x,
            e,
            barWidth,
            percentLoud * HEIGHT * (mut <= 0 ? 1 : mut) + 15
          );
          x += barWidth + barGap;
        }
      }
      t++;
      num = 0;
      if (arr.length > 15) {
        arr.pop();
      }
      requestAnimationFrame(renderFrame);
    }
    renderFrame();
  };

  onMount(() => {
    draw();
  });

  let playing = false;
</script>

<style>
  div {
    height: 75%;
    width: 2em;
    background-size: contain;
    background-repeat: no-repeat;
  }

  canvas {
    width: 100%;
    height: 100%;
    transform: rotateZ(180deg);
  }

  .equalizer {
    height: 70%;
  }
</style>

<div class="equalizer">
  <canvas id="canvas" />
</div>
