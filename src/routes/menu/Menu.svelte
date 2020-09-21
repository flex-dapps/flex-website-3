<script>
  import { Counter, Nav, Grid, Heading } from 'components'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { mobile } from 'stores'

  const routes = [
    { label: 'about', route: '/about' },
    { label: 'apps', route: '/apps' },
    { label: 'ventures', route: '/ventures' },
    { label: 'users', route: '/users' },
    { label: 'mail', route: '/mail' },
    { label: 'newslettuce', route: '/newsletters' },
    // { label: "player", route: "/player" }
  ]

  let interval
  let loaded = false
  let logoHighlight = false
  let flexHighlight = true
  let dappsHighlight = false
  let flex
  let dapps

  // I have added this subscription to $mobile because something about my mobile store
  // and the component lifecycle my typewriter animation is erroring and this causes other
  // elements on the page to fail

  const bindListeners = () => {
    if (!flex || !dapps) {
      return setTimeout(bindListeners, 50)
    }
    flex.addEventListener('mouseenter', () => {
      console.log('flex')
      flexHighlight = true
      dappsHighlight = false
    })
    dapps.addEventListener('mouseenter', () => {
      console.log('dapps')
      flexHighlight = false
      dappsHighlight = true
    })
  }

  onMount(() => {
    mobile.check()
    loaded = true
    bindListeners()
  })
</script>

<style>
  .w-33 {
    width: 33%;
  }

  .highlighted {
    background: #a9e3b0;
    color: #2a333e;
  }

  h1 {
    font-weight: lighter;
    padding: 0 0.4em;
    font-size: 3.3em;
    margin: 0;
    text-align: center;
    vertical-align: middle;
    cursor: default;
  }
</style>

{#if loaded}
  {#if $mobile}
    <div class="w-100 h-100 flex flex-column justify-between items-center">
      <div />
      <div class="f3 h-100 flex-column justify-center flex">
        <div on:click={() => (logoHighlight = !logoHighlight)}>
          <h1 class:highlighted={!logoHighlight}>FLEX</h1>
          <h1 class:highlighted={logoHighlight}>DAPPS</h1>
        </div>
      </div>
      <div class="w-100 f3">
        <Nav {routes} />
      </div>
    </div>
  {:else if !$mobile}
    <div class="w-100 h-100 flex justify-around items-center pa4">
      <div class="f3 h-100 flex-column justify-center flex">
        <div>
          <h1 bind:this={flex} class:highlighted={flexHighlight}>FLEX</h1>
          <h1 bind:this={dapps} class:highlighted={dappsHighlight}>DAPPS</h1>
        </div>
      </div>
      <div class="w-33 f3">
        <Nav {routes} />
      </div>
    </div>
  {/if}
{/if}
