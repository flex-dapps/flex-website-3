<script>
  import { PageWrapperWithMenu } from 'components'
  import { Ascii } from 'fragments'
  import { data } from './data'
  import { fade, fly } from 'svelte/transition'
  import { typewriter } from 'animations'

  let subroutes = [{ label: '< Go Back', route: '/' }]
  let clients = []
  clients.unshift(data[0])
  data.map((client) => {
    let obj = {}
    obj.label = client.label
    subroutes.push(obj)
    clients.push(client)
  })
  let active = 1
  $: client = clients[active]
  let navStyles = 'pa1 fs3'
</script>

<svelte:head>
  <meta name="google" content="notranslate" />
</svelte:head>

<PageWrapperWithMenu routes={subroutes} bind:active data>
  {#if active !== null}
    <div class="h-100 overflow-scroll">
      <div class=" pa3 description">
        <div class="logo tl h-50 flex justify-start items-center">
          <Ascii content={client.logo} />
        </div>
        <h1>{client.name}</h1>
        <p>OVERVIEW: {client.overview}</p>
        <!-- <p>DURATION: {client.duration}</p> -->
        {#each client.links as linkObj}
          <p>
            <a href={linkObj.link}>
              {linkObj.text ? linkObj.text : linkObj.link}
            </a>
          </p>
        {/each}

        {#each client.description as desc}
          <p>{desc}</p>
        {/each}
      </div>
    </div>
  {/if}
</PageWrapperWithMenu>

<style>
  .description {
    font-size: 1.1rem;
    margin-bottom: 15vh;
  }

  .logo {
    font-size: 0.34em;
    transition: font-size 0.2s ease-in-out;
    top: 0;
  }

  p {
    margin-bottom: 20px;
  }

  div::-webkit-scrollbar {
    display: none;
  }

  h1 {
    margin: 0.5rem 0;
  }
</style>
