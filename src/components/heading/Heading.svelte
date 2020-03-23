<script>
  import { createEventDispatcher } from "svelte";
  import { typewriter } from "animations";
  const messages = [
    "WE BUILD PROGRAMMABLE MONEY",
    // "WE TRANSFORM PEOPLE INTO BANKS",
    // "WE BUILD CURRENCY POWERED APPLICATIONS",
    "WE WRITE UNSTOPPABLE CODE",
    "WE DO NOT NEED PERMISSION"
    // "NEITHER DO YOU"
  ];

  let active = 0;
  export let message;
  $: message = messages[active];

  const dispatch = createEventDispatcher();
  const finishTyping = () => dispatch("finishTyping");
</script>

<style>
  .typing-wrapper {
    position: relative;
    min-height: 2em;
    min-width: 100%;
  }

  .typing {
    font-size: 2em;
    font-weight: lighter;
    margin: 0;
  }

  .carat {
    position: relative;
    right: 0;
    background: #a9e3b0;
    min-width: 10em;
    bottom: 0.25em;
    height: 1.5em;
    animation: flash 0.5s infinite linear !important;
  }

  @keyframes flash {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    51% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<div class="typing-wrapper flex justify-center">
  {#if message}
    <div>
      <span
        class="typing"
        in:typewriter={{ speed: 75 }}
        on:introend={() => {
          window.setTimeout(() => {
            message = false;
          }, 3000);
        }}
        out:typewriter={{ speed: 35 }}
        on:outroend={() => {
          finishTyping();
          window.setTimeout(() => {
            active === messages.length - 1 ? (active = 0) : active++;
            message = true;
          }, 250);
        }}>
        {message}
      </span>
      <span class="carat">&nbsp;</span>
    </div>
  {/if}
</div>
