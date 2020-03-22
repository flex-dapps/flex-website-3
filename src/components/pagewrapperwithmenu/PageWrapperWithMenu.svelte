<script>
  // Page Wrapper With Menu is  a super bespoke component for the Flex site which wraps a content
  // with the appropriate submenu
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { Back, Nav, Page } from "components";
  import { mobile } from "stores";
  let back = [{ label: "< Go Back", route: "/" }];

  export let active;
  export let routes;

  $: item = routes[active].label;
</script>

<style>
  .mobile-nav {
    position: absolute;
    bottom: 0;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    left: 0;
    background: #2a333e;
    border-top: 1px #a9e3b0 solid;
    font-size: 1.3em;
  }

  .arrow {
    font-size: 2em;
    margin: 0 0.5em;
  }
</style>

<div
  class={'flex h-100 ' + ($mobile ? 'flex-column' : 'justify-between items-start')}>
  <div
    class={!$mobile ? 'options flex flex-column justify-center mr4 w-25' : ''}>
    <Nav left={true} bind:active routes={$mobile ? back : routes} />
  </div>
  <!-- CONTENT -->
  <div class={($mobile ? 'w-100' : 'h-100 w-75') + ' noscroll'}>
    <slot />
  </div>
  <!-- CONTENT -->
  {#if $mobile}
    <div class="mobile-nav">
      <div
        class="arrow"
        on:click={() => (active > 0 ? active-- : (active = routes.length - 1))}>
        {'<'}
      </div>
      <a href="www.google.com" target="_new">{`${active}.  ${item}`}</a>
      <div
        class="arrow"
        on:click={() => (active < routes.length - 1 ? active++ : (active = 1))}>
        {'>'}
      </div>
    </div>
  {/if}
</div>
