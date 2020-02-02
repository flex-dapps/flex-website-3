<script>
  // to do:
  //   1. Add real photos
  import { PageWrapperWithMenu } from "components";
  import { getContext } from "svelte";
  import { Router, Route, navigate, Link } from "svelte-routing";
  import { typewriter } from "animations";
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
  p {
    line-height: 2rem;
    font-size: 1rem;
  }
</style>

<!-- find the url context and do If blocks -->
<PageWrapperWithMenu routes={subroutes} bind:active data>
  {#if active !== null}
    <div class="description pr3">
      <h1>{human.label}</h1>
      <img alt={'Photo of ' + human.name} class="w-33 mr4 fl" src={human.url} />
      <p>KNOWN ALIAS: {human.codeName}</p>
      <p>NAME: {human.name}</p>
      <p>ROLE: {human.position}</p>
      <p>SKILLS: {human.skills}</p>
      {#each human.special as special}
        <p>{special.key.toUpperCase()}: {special.value}</p>
      {/each}
      <p>{human.description}</p>
    </div>
  {/if}
</PageWrapperWithMenu>
