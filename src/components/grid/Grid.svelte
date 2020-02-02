<script>
  import { onMount } from "svelte";
  import { fade } from "animations";

  //   export let id;

  let lines = [];
  let counter = 0;
  const newLine = {
    pos: 1,
    age: 0
  };

  let preloaded1000Frames = false;
  let canvas = document.getElementsByTagName("canvas")[0];
  onMount(() => {
    let ctx = canvas.getContext("2d");
    canvas.height = canvas.clientHeight;

    canvas.width = canvas.clientWidth;
    let width = canvas.width,
      height = canvas.height;

    function handleLines() {
      if (counter % 85 === 0) {
        lines.push(newLine);
      }
      let _lines = [];
      lines.map((line, i) => {
        if (line.age < 1000) {
          _lines.push({ pos: line.pos + line.pos / 100, age: line.age + 1 });
        } else {
          lines.splice(i, 0);
        }
      });
      lines = _lines;
    }

    function drawLine(fromX, fromY, toX, toY) {
      ctx.beginPath();
      ctx.strokeStyle = "#a9e3b0";
      ctx.lineWidth = 2;
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    }

    function drawGrid(subDivisions, zSpeed, ceil) {
      ctx.save();

      let incrementDistance = width / subDivisions;
      let start = 0 - subDivisions / 2;

      for (let i = 0; i < subDivisions; i++) {
        drawLine(
          incrementDistance * i,
          height / 3,
          incrementDistance * i + (start + i) * zSpeed,
          height
        );
      }

      drawLine(0, height / 3, width, height / 3);
      lines.map(line => {
        drawLine(0, line.pos + height / 3, width, line.pos + height / 3);
      });

      ctx.restore();
    }

    function frame() {
      handleLines();
      counter++;
      ctx.clearRect(0, 0, width, height);
      drawGrid(10, 800, height / 3);
    }

    (function run() {
      requestAnimationFrame(run);
      if (!preloaded1000Frames) {
        for (let i = 0; i < 1000; i++) {
          frame();
        }
        preloaded1000Frames = true;
      }
      frame();
    })();
  });
</script>

<style>
  canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    opacity: 0.5;
  }
</style>

<canvas bind:this={canvas} />
