<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { Gyarn, Grid, Heading } from "components";
  import { typewriter } from "animations";
  import { mobile } from "stores";

  let t = 0,
    percent = 0;

  let loading = true;
  let intermediate = false;
  let mounted = false;
  export let loaded = false;

  onMount(() => {
    mounted = true;
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

<div class="w-100 h-100">
  {#if mounted}
    <div
      in:fade={{ duration: 1000 }}
      out:fade={{ duration: 1000 }}
      on:outroend={() => {
        loaded = true;
      }}
      class="w-100 h-100 flex items-center justify-center">
      <div
        class="w-100 h-25 flex flex-column items-center justify-between f4 tc">
        <Heading />
        <button on:click={() => (mounted = false)}>[ENTER]</button>
      </div>
    </div>
  {/if}
</div>
