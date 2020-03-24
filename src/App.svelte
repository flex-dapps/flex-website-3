<script>
  import { setContext, getContext, onMount } from "svelte";
  import { Router, Route, navigate } from "svelte-routing";
  import { elasticOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  import { typewriter } from "animations";
  import { Loading } from "components";
  import { Menu, Apps, Mail, About, Users, Ventures, Player } from "routes";
  import { Music } from "fragments";
  import { mobile, keys } from "stores";
  import { data } from "./routes/users/data";

  let version = "3.0";

  let home = true;
  let typingAnimationFinished = false;
  let enterPressed = false;

  const onFinishTyping = () => {
    if (enterPressed) typingAnimationFinished = true;
  };

  const animatedNavigate = route => {
    navigate(route);
    if (route === "/") {
      home = true;
    } else {
      typingAnimationFinished = true;
    }
  };

  onMount(() => {
    window.onkeydown = k => {
      if (k.keyCode === keys.enter) {
        enterPressed = true;
      }
    };
    mobile.check();
    window.onresize = mobile.check;
    if (window.location.pathname !== "/") {
      enterPressed = true;
      typingAnimationFinished = true;
    }
    for (let user of data) {
      const img = new Image();
      img.src = user.url;
    }
  });
  setContext("animatedNavigate", animatedNavigate);
</script>

<style>
  @media only screen and (min-aspect-ratio: 1/1) {
    #app {
      border: 0.1rem solid #a9e3b0;
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      height: 100%;
      max-width: 1280px;
      max-height: 740px;
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
  }

  @media only screen and (max-aspect-ratio: 1/1) {
    #app {
      box-sizing: border-box;
      position: absolute;
      width: 100%;
      height: 100%;
      padding-top: 1rem;
    }

    .topbar {
      display: none;
    }
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
{#if !typingAnimationFinished}
  <Loading bind:enterPressed on:finishTyping={onFinishTyping} />
{:else if typingAnimationFinished}
  <div id="app" class="overflow-hidden" in:fade out:fade>
    <div class="topbar flex items-center justify-between ph2">
      <div class="w-40">{'flexdapps v' + version}</div>
      <div class="w-60 h-75 player-container">
        <Player />
      </div>
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
      </Router>
    </section>
  </div>
{/if}
<!-- To do: -->
<!-- make <h3>flexdapps</h3> include correct route -->

<!-- use set and get context to pass my navigate function around which triggers
 the appropriate container animations -->
