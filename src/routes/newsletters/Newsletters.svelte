<script>
  import { PageWrapperWithMenu } from 'components'
  import { sendicatePath, newsletters } from './data'

  let subroutes = [{ label: '< Go Back', route: '/' }]
  newsletters.map((letter) => {
    let obj = {}
    obj.label = letter.date
    subroutes.push(obj)
    newsletters.push(letter)
  })
  newsletters.unshift(newsletters[0])
  let active = 1
  $: newsletter = newsletters[active]
</script>

<style>
</style>

<PageWrapperWithMenu routes={subroutes} bind:active data={newsletters}>
  <h2>{newsletter.title}</h2>
  <iframe
    src={`${sendicatePath}/${newsletter.slug}`}
    title="lettuce"
    class="w-100 h-100" />
</PageWrapperWithMenu>
