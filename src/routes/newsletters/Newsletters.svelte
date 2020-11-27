<script>
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { PageWrapperWithMenu } from 'components'
  import { sendicatePath, newsletters } from './data'

  let subroutes = [{ label: '< Go Back', route: '/' }]
  let items = subroutes
  let active = 0
  onMount(() => {
    items = []
    newsletters.forEach((letter) => {
      let obj = {}
      obj.label = letter.title
      subroutes.push(obj)
      items.push(letter)
    })
    items.unshift(newsletters[0])
    active = 1
  })
  $: newsletter = items[active]
</script>

<style>
  .toobig {
    width: 110%;
    border: none;
  }
  h2 {
    border-bottom: 2px solid #a9e3b0;
  }
</style>

<PageWrapperWithMenu routes={subroutes} bind:active data={items}>
  <h2>{newsletter.title}</h2>
  <subtitle>{moment(newsletter.date).format('MMM DD yyyy')}</subtitle>
  <iframe
    src={`${sendicatePath}/${newsletter.slug}`}
    title="lettuce"
    class="w-100 h-100 toobig" />
</PageWrapperWithMenu>
