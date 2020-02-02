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
  }

  .logo {
    font-size: 0.34em;
    transition: font-size 0.2s ease-in-out;
  }

  h1 {
    margin: 0.5rem 0;
  }
</style>

<svelte:head>
  <meta name="google" content="notranslate" />
</svelte:head>

<PageWrapperWithMenu routes={subroutes} bind:active data>
  {#if active !== null}
    <div class="description pa3">
      <div class="logo">
        <Ascii content={venture.logo} />
      </div>
      <h1>{venture.name}</h1>
      <a href={venture.url} target="_new">{venture.url}</a>
      <p>{venture.tagline}</p>
      <p>{venture.description}</p>
    </div>
  {/if}
</PageWrapperWithMenu>
