<script>
  import { Back, Nav, PageWrapperWithMenu } from "components";
  import { Ascii } from "fragments";
  import { onMount } from "svelte";
  import { data } from "./data";
  import { navigate } from "svelte-routing";
  import { typewriter } from "animations";
  import { mobile } from "stores";

  let subroutes = [{ label: "< Go Back", route: "/" }];
  let ventures = [];
  ventures.unshift(data[0]);
  data.map(venture => {
    let obj = {};
    obj.label = venture.name;
    subroutes.push(obj);
    ventures.push(venture);
  });
  let active = 1;
  $: venture = ventures[active];
  let navStyles = "pa1 fs3";
</script>

<style>
  .description {
    font-size: 1.1rem;
    max-height: 100vh;
    padding-bottom: 30vh;
  }

  .description::-webkit-scrollbar {
    display: none;
  }

  .logo {
    font-size: 0.34em;
    transition: font-size 0.2s ease-in-out;
  }

  div::-webkit-scrollbar {
    display: none;
  }

  p {
    margin-bottom: 20px;
  }

  h1 {
    margin: 0.5rem 0;
  }
</style>

<svelte:head>
  <meta name="google" content="notranslate" />
  <!-- Stops the ascii art from making google chrome turn on translate -->
</svelte:head>

<PageWrapperWithMenu routes={subroutes} bind:active data>
  {#if active !== null}
    <div class="description pa3 h-100 overflow-scroll">
      <div class="logo justify-center tl pr4 h-50">
        <Ascii content={venture.logo} />
      </div>
      <h1>{venture.name}</h1>
      <p>OVERVIEW: {venture.overview}</p>
      {#each venture.links as linkObj}
        <p>
          <a href={linkObj.link}>
            {linkObj.text ? linkObj.text : linkObj.link}
          </a>
        </p>
      {/each}

      {#each venture.description as desc}
        <p>{desc}</p>
      {/each}
    </div>
  {/if}
</PageWrapperWithMenu>
