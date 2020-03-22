<script>
  // Todo:
  // 2. clear interval on navigate or remember broken state
  // 3. refactor so glitch is all stored in 1 object and then there is only update glitch and update active and html if block chooses which to render rather
  import { onMount } from "svelte";
  import { typewriter } from "animations";

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  // Content
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
      number: "00619",
      message: "Days without cease and desist     "
    }
  ];
  shuffleArray(memes);
  let randomChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "x",
    "&",
    "%",
    "#",
    "~",
    "="
  ];
  //
  // Animation State
  let hovering = false;
  let broken = false;
  let interval;
  //
  // Text State
  let active = 0;
  let number = [];
  let message;
  //

  const generateGlitchText = (length = 5) => {
    let text = "";
    for (var i = 0; i < length; i++) {
      shuffleArray(randomChars);
      text += randomChars[Math.round(i % randomChars.length)];
    }
    return text;
  };

  const setNumber = string => {
    number = [];
    for (var i = 0; i < 5; i++) {
      number.push(string.charAt(i));
    }
  };

  const setMessage = string => {
    // getElementById('message')
    message = string;
  };

  const activateGlitch = () => {};

  setNumber(memes[active].number);

  onMount(() => {
    let el = document.getElementById("counter");

    el.addEventListener("mouseenter", e => {
      if (!hovering && !broken) {
        hovering = true;
        interval = setInterval(() => {
          let newGlitchNumber = generateGlitchText(5);
          setNumber(newGlitchNumber);
          let r = Math.round(Math.random() * 70);
          let newGlitchMessage = generateGlitchText(r);
          setMessage(newGlitchMessage);
        }, 200);
      }
      return;
    });

    el.addEventListener("mouseleave", e => {
      hovering = false;
      if (active === memes.length - 1 && !broken) {
        broken = true;
      }
      if (broken) {
        return;
      } else {
        active++;
        clearInterval(interval);
        setNumber(memes[active].number);
      }
    });
  });
</script>

<style>
  h1 {
    font-size: 2em;
    text-align: center;
  }
  h2 {
    font-size: 1em;
    word-wrap: break-word !important;
    width: 100%;
  }
</style>

<div id="counter" class="flex flex-column w-75 h-100 mw6">

  {#if hovering || broken}
    <div class="flex justify-between w-100">
      {#each number as num}
        <h1>{num}</h1>
      {/each}
    </div>
    <h2 id="message">{message}</h2>
  {:else if !hovering && !broken}
    <div class="flex justify-between w-100">
      {#each number as num}
        <h1>{num}</h1>
      {/each}
    </div>
    <h2 in:typewriter={{ speed: 20 }}>{memes[active].message}</h2>
  {/if}
</div>
<!-- <canvas id bind:this={canvas} /> -->
