<script>
  import { PageWrapperWithMenu } from "components";
  import { Ascii } from "fragments";
  import { data } from "./data";
  import { fade, fly } from "svelte/transition";
  import { typewriter } from "animations";

  let subroutes = [{ label: "< Go Back", route: "/" }];
  let clients = [];
  clients.unshift(data[0]);
  data.map(client => {
    let obj = {};
    obj.label = client.name;
    subroutes.push(obj);
    clients.push(client);
  });
  let active = 1;
  $: client = clients[active];
  console.log(clients);
  let navStyles = "pa1 fs3";
</script>

<style>
  .description {
    font-size: 1.1rem;
  }

  .logo {
    font-size: 0.34em;
    transition: font-size 0.2s ease-in-out;
    top: 0;
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
        <Ascii content={client.logo} />
      </div>
      <h1>{client.name}</h1>
      <p>{client.tagline}</p>
      <p>website: {client.url}</p>
      <p>{client.description}</p>
    </div>
  {/if}
</PageWrapperWithMenu>
