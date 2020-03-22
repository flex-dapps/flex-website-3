<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Gyarn, Grid, Heading } from "components";
  import { typewriter } from "animations";
  import { mobile } from "stores";

  export let wantToLoad = false;

  let t = 0;
  let percent = 0;

  let loading = false;
  let intermediate = false;
  let mounted = false;

  onMount(() => {
    if (!wantToLoad && window.location.pathname === "/") {
      mounted = true;
    }
    mobile.check();
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
    animation: flashing 2s infinite ease-in-out;
    color: #a9e3b0;
    font-size: 1.5em;
  }
</style>

<div id="app" class="w-100 h-100">
  {#if mounted}
    <div
      in:fade={{ duration: 1000 }}
      class="w-100 h-100 flex items-center justify-center">
      <div
        class="w-100 h-25 flex flex-column items-center justify-between f4 tc">
        <Heading on:finishTyping />
        {#if !wantToLoad}
          <button
            on:click={() => {
              wantToLoad = true;
              mounted = false;
              console.log({ wantToLoad });
            }}>
            [ENTER]
          </button>
        {:else}
          <div />
        {/if}
      </div>
    </div>
  {/if}
</div>
