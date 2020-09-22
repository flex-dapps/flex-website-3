<script>
  // Page Wrapper With Menu is  a super bespoke component for the Flex site which wraps a content
  // with the appropriate submenu
  import { Nav } from 'components'
  import { mobile } from 'stores'
  let back = [{ label: '< Go Back', route: '/' }]

  export let active
  export let routes

  let wrappedContent

  $: item = routes[active].label
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

  .box {
    box-sizing: content-box;
  }
</style>

<div
  class={'flex h-100 ' + ($mobile ? 'flex-column' : 'justify-between items-start')}>
  <div
    class={!$mobile ? 'options flex flex-column justify-start mr3 w-30 h-100 overflow-hidden' : ''}>
    <div class="w-100 h-100 overflow-y-scroll pr3 box">
      <Nav
        left={true}
        bind:active
        routes={$mobile ? back : routes}
        mobile={$mobile} />
    </div>
  </div>
  <!-- CONTENT -->
  <div
    class={($mobile ? 'w-100 h-100' : 'h-100 w-75') + ' noscroll'}
    bind:this={wrappedContent}>
    <slot />
  </div>
  <!-- CONTENT -->
  {#if $mobile}
    <div class="mobile-nav">
      <div
        class="arrow"
        on:click={() => {
          wrappedContent.children[0].scrollTop = 0
          if (active > 1) {
            active--
          } else {
            active = routes.length - 1
          }
        }}>
        {'<'}
      </div>
      <div>{`${active}.  ${item}`}</div>
      <div
        class="arrow"
        on:click={() => {
          wrappedContent.children[0].scrollTop = 0
          if (active < routes.length - 1) {
            active++
          } else {
            active = 1
          }
        }}>
        {'>'}
      </div>
    </div>
  {/if}
</div>
