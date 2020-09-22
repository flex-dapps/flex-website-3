<script>
  import moment from 'moment'
  import { PageWrapperWithMenu } from 'components'
  import { sendicatePath, newsletters } from './data'

  let subroutes = [{ label: '< Go Back', route: '/' }]
  newsletters.map((letter) => {
    let obj = {}
    obj.label = moment(letter.date).format('MMM DD yyyy')
    subroutes.push(obj)
    newsletters.push(letter)
  })
  newsletters.unshift(newsletters[0])
  let active = 1
  $: newsletter = newsletters[active]
</script>

<style>
  .toobig {
    width: 110%;
    margin-left: -5%;
    border: none;
  }
  h2 {
    border-bottom: 2px solid #a9e3b0;
  }
</style>

<PageWrapperWithMenu routes={subroutes} bind:active data={newsletters}>
  <h2>{newsletter.title}</h2>
  <iframe
    src={`${sendicatePath}/${newsletter.slug}`}
    title="lettuce"
    class="w-100 h-100 toobig" />
</PageWrapperWithMenu>
