<script>
  import { Counter, Nav, Grid } from "components";
  import { typewriter } from "animations";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { mobile } from "stores";

  const routes = [
    { label: "about", route: "/about" },
    { label: "apps", route: "/apps" },
    { label: "ventures", route: "/ventures" },
    { label: "users", route: "/users" },
    { label: "mail", route: "/mail" }
    // { label: "player", route: "/player" }
  ];

  const messages = [
    "WE BUILD PROGRAMMABLE MONEY",
    "WE TRANSFORM PEOPLE INTO BANKS",
    // "WE BUILD CURRENCY POWERED APPLICATIONS",
    "WE WRITE UNSTOPPABLE CODE"
  ];

  let active = 0;
  let message = true;
  let interval;
</script>

<style>
  h1 {
    position: relative;
    min-height: 1em;
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

  .w-33 {
    width: 33%;
  }

  .w-66 {
    width: 66%;
  }
  h1::after {
    position: absolute;
    /* right: 1em; */
    content: "";
    background: #a9e3b0;
    bottom: 0.2em;
    height: 0.75em;
    width: 0.4em;
    animation: flash 0.5s infinite linear !important;
  }
</style>

{#if $mobile}
  <div class="w-100 h-100 flex flex-column justify-between items-center">
    <div />
    <div class="pa2">
      {#if message}
        <h1
          in:typewriter={{ speed: 75 }}
          on:introend={() => {
            window.setTimeout(() => {
              console.log('introEnd');
              message = false;
            }, 6000);
          }}
          out:typewriter={{ speed: 35 }}
          on:outroend={() => {
            window.setTimeout(() => {
              console.log('outtroend');
              active === messages.length - 1 ? (active = 0) : active++;
              message = true;
            }, 250);
          }}
          class="f1 tc">
          {messages[active]}
        </h1>
      {/if}
    </div>
    <div class="w-100 f3">
      <Nav {routes} />
    </div>
  </div>
{:else if !$mobile}
  <div class="w-100 h-100 flex justify-around items-center pa4">
    <!-- <Grid /> -->
    <div class=" w-66 ">
      <h1
        in:typewriter={{ speed: 75 }}
        on:introend={() => {
          window.setTimeout(() => {
            console.log('introEnd');
            message = false;
          }, 6000);
        }}
        out:typewriter={{ speed: 35 }}
        on:outroend={() => {
          window.setTimeout(() => {
            console.log('outtroend');
            active === messages.length - 1 ? (active = 0) : active++;
            message = true;
          }, 250);
        }}
        class="f1 tc">
        {messages[active]}
      </h1>
    </div>
    <div class="w-33 f3">
      <Nav {routes} />
    </div>
  </div>
{/if}
