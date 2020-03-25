<script>
  // to do:
  //   1. Add real photos
  import { PageWrapperWithMenu } from "components";
  import { getContext } from "svelte";
  import { Router, Route, navigate, Link } from "svelte-routing";
  import { typewriter } from "animations";
  import { mobile } from "stores";
  import { data } from "./data";
  let humans = [];
  let subroutes = [{ label: "< Go Back", route: "/" }];
  data.map(person => {
    let obj = {};
    obj.label = person.label;
    subroutes.push(obj);
    humans.push(person);
  });
  humans.unshift(humans[0]);
  let active = 1;
  $: human = humans[active];
  let navStyles = "pa1 fs3";
</script>

<style>
  .description-mobile {
    overflow: scroll;
    max-height: 100vh;
    padding-bottom: 30vh;
  }

  p {
    /* line-height: 2rem; */
    font-size: 1rem;
  }

  div::-webkit-scrollbar {
    display: none;
  }

  .sideline {
    /* font-size: 0.75rem; */
    line-height: 2rem;
  }
</style>

<!-- find the url context and do If blocks -->
<PageWrapperWithMenu routes={subroutes} bind:active data>
  {#if active !== null}
    <div class={!$mobile ? 'description pr3' : 'description-mobile pa3'}>
      <h1>{human.label}</h1>
      <div class={!$mobile ? 'flex flex-row pb3' : 'flex flex-column'}>
        <img
          alt={'Photo of ' + human.name}
          class={!$mobile ? 'w-33 mr4 fl h-100' : 'w-75'}
          src={human.url} />
        <div class="flex flex-column w-100">
          <p class="sideline">KNOWN ALIAS: {human.codeName}</p>
          <p class="sideline">NAME: {human.name}</p>
          <p class="sideline">ROLE: {human.position}</p>
          <p class="sideline">SKILLS: {human.skills}</p>
          {#each human.special as special}
            <p class="sideline">{special.key.toUpperCase()}: {special.value}</p>
          {/each}
        </div>
      </div>
      <p>{human.description}</p>
    </div>
  {/if}
</PageWrapperWithMenu>
