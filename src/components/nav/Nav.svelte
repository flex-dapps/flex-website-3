<script>
  // use actual highlighting / selecting for the buttons
  // Todo:
  // 1. Make active item change on mouseover
  // 2. Make clicking navigate to clicked rather than active
  // 3. If there's a navigate route for an item, give it alittle booping carrot

  import { onMount, getContext } from 'svelte'
  export let routes = [
    { label: 'link 1', route: '/yeet' },
    { label: 'link 2', route: '/yoot' },
  ]

  const animatedNavigate = getContext('animatedNavigate')
  export let start = 0
  export let active = start
  export let customClass
  export let left
  export let mobile

  const addCustomClass = () => {
    if (customClass === undefined) {
      return
    }
    let links = document.getElementsByClassName('item')
    if (links !== undefined) {
      for (let link of links) {
        link.className += customClass
      }
    }
    return
  }

  onMount(() => {
    let navItems = document.getElementsByClassName('item')
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener('mouseenter', (e) => {
        e.target.classList.add('selected')
      })
      navItems[i].addEventListener('mouseleave', (e) => {
        if (active === i) return
        e.target.classList.remove('selected')
      })
    }

    window.addEventListener(
      'keyup',
      (e) => {
        let key = e.keyCode
        if (key === 40 || key === 39) {
          active === routes.length - 1 ? (active = 0) : active++
        } else if (key === 38 || key === 37) {
          active === 0 ? (active = routes.length - 1) : active--
        } else if (key === 13) {
          animatedNavigate(routes[active].route)
        }
      },
      false
    )
  })

  // Refactor this garbage
  const clickHandler = (route, i) => {
    if (typeof route === 'string' || route instanceof String) {
      animatedNavigate(route)
      return
    }
    if (typeof route !== 'undefined') {
      animatedNavigate(routes[active].route)
    }
    addCustomClass()
    active = i
  }
</script>

<!-- Map items -->
{#each routes as route, i}
  <div
    style="text-align:{left ? 'left' : 'center'};"
    on:click={() => clickHandler(route.route, i)}
    class={i === active ? ' selected item' : ' item'}
    class:mobile
  >
    {route.label}
  </div>
{/each}

<style>
  .selected .micro {
    color: #2a333e;
  }

  .micro {
    height: 100%;

    color: #a9e3b0;
    font-size: 0.5em;
  }

  div {
    padding: 0.3rem 0.5rem 0.3rem 1.5rem;
    font-size: 1.5em;
    line-height: 1em;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .selected {
    position: relative;
    background: #a9e3b0;
    color: #2a333e;
    cursor: pointer;
  }

  .selected::before {
    content: '$';
    position: absolute;
    left: 0.5rem;
    font-size: 1em;
  }

  .mobile {
    border-bottom: 1px solid #a9e3b0;
    padding-bottom: 1rem;
  }
</style>
