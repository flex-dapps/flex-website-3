<script>
  import { setContext, getContext, onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { elasticOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { typewriter } from "animations";
  import { Loading } from "components";
  import { Menu, Apps, Mail, About, Users, Ventures, Player } from "routes";
  import { Music } from "fragments";
  import { mobile } from "stores";

  let version = "3.0";

  let home = true;
  let loaded = true;

  const animatedNavigate = route => {
    navigate(route);
    if (route === "/") {
      home = true;
    } else {
      home = false;
    }
  };

  window.onresize = mobile.check;
  setContext("animatedNavigate", animatedNavigate);
</script>

<style>
  /* @media only screen and (min-aspect-ratio: 1/1) {
    #app {
      font-size: 22px;
      max-height: 300;
      border: 1px solid red;
    }
  } */
  #app {
    border: 0.1rem solid #a9e3b0;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 1280px;
    max-height: 720px;
    padding-top: 1.5rem;
  }

  .topbar {
    width: 100%;
    height: 1.5rem;
    background: #a9e3b0;
    color: #2a333e;
    position: absolute;
    top: 0;
  }
</style>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=VT323&display=swap"
    rel="stylesheet" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" />
</svelte:head>
{#if !loaded}
  <Loading bind:loaded />
{:else if loaded}
  <div id="app" class="overflow-hidden" in:fade={{ duration: 1000 }} out:fade>
    <div class="topbar flex items-center justify-between pl1">
      {'flexdapps v' + version}
    </div>
    <section class="w-100 h-100">
      <Router>
        <Route path="/">
          <Menu />
        </Route>
        <Route path="/mail">
          <Mail />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/apps">
          <Apps />
        </Route>
        <Route path="/ventures">
          <Ventures />
        </Route>
        <Route path="/player">
          <Player />
        </Route>
      </Router>
    </section>
  </div>
{/if}
<!-- To do: -->
<!-- make <h3>flexdapps</h3> include correct route -->

<!-- use set and get context to pass my navigate function around which triggers
 the appropriate container animations -->
