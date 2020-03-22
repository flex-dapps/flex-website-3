<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Gyarn, Grid, Heading } from "components";
  import { typewriter } from "animations";
  import { mobile } from "stores";

  export let enterPressed = false;

  let enterText = "[ENTER]";
  let btn;

  $: if (enterPressed) {
    btn.classList.remove("flashing");
  }

  let loading = false;
  let intermediate = false;
  let mounted = false;

  onMount(() => {
    if (!enterPressed && window.location.pathname === "/") {
      mounted = true;
    }
    mobile.check();
    window.onkeydown = k => {
      if (k.keyCode === keys.enter) {
        enterPressed = true;
      }
    };
  });
</script>

<style>
  @keyframes flashing {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  button {
    background: none;
    border: none;
    color: #a9e3b0;
    font-size: 1.5em;
  }

  .flashing {
    animation: flashing 2s infinite ease-in-out;
  }
</style>

<div id="app" class="w-100 h-100">
  <div
    in:fade={{ duration: 1000 }}
    class="w-100 h-100 flex items-center justify-center">
    <div class="w-100 h-25 flex flex-column items-center justify-between f4 tc">
      <Heading on:finishTyping message={enterPressed ? false : 0} />
      <button
        class="flashing"
        bind:this={btn}
        on:click={() => {
          enterPressed = true;
          mounted = false;
        }}>
        {enterPressed ? 'YEET' : '[ENTER]'}
      </button>
    </div>
  </div>
</div>
