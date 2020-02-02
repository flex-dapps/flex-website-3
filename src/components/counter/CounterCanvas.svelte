<script>
  // Todo:
  // 1. Turn counter into HTML and make it print with typewriter
  import { onMount } from "svelte";
  import {
    counter,
    glitchCounter,
    marquee,
    glitchMarquee
  } from "./renderFunctions";
  import { typewriter } from "animations";

  let canvas = document.getElementsByTagName("canvas")[0];
  let memes = [
    {
      number: "00018",
      message: "Million USD Buy Now! buyus@flexdapps.com     "
    },
    {
      number: "15563",
      message: "USD won at global hackathons /dab      "
    },
    {
      number: "00011",
      message: "Gold Watches discovered since march 2018     "
    },
    {
      number: "00011",
      message: "Gold Watches discovered since march 2018     "
    },
    {
      number: "00619",
      message: "Days without cease and desist     "
    }
  ];

  let t = 0;
  let active = 0;
  let alive = true;
  let newTime = 0;
  let lastTime;
  let hovering = false;

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  onMount(() => {
    shuffleArray(memes);
    // canvas.addEventListener("mouseover", e => {
    //   hovering = true;
    //   if (active === memes.length - 1) {
    //     alive = false;
    //   }
    // });
    // canvas.addEventListener("mouseout", e => {
    //   hovering = false;
    //   active++;

    //   t = 0;
    // });

    let ctx = canvas.getContext("2d");
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    let { width, height } = canvas;
    let frame;

    (function loop() {
      frame = requestAnimationFrame(loop);
      ctx.fillStyle = "#a9e3b0";
      if (newTime !== lastTime) {
        ctx.clearRect(0, 0, width, height);
        if (hovering || !alive) {
          glitchCounter(ctx, height, width);
          glitchMarquee(ctx, height, width);
        } else {
          let { message, number } = memes[active];
          counter(ctx, height, width, number);
          marquee(ctx, height, width, message, t);
        }
      }

      // increment time
      lastTime = newTime;
      if (t % 4 === 0) {
        newTime++;
      }
      t++;
    })();
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<style>
  canvas {
    width: 100%;
  }
</style>

<div class="flex flex-column w-100">
  <h1>{memes[active].number}</h1>
  <div in:typewriter={{ speed: 50 }}>{memes[active].message}</div>
</div>
<!-- <canvas id bind:this={canvas} /> -->
