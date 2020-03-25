<script>
  import data from "./data";
  import { PageWrapperWithMenu } from "components";
  import { onMount } from "svelte";
  import { Router, Route, navigate, Link } from "svelte-routing";
  var showdown = require("showdown");

  export let subroutes = [{ label: "< Go Back", route: "/" }];

  const convertMarkdown = markdown => {
    var converter = new showdown.Converter(),
      text = markdown;
    return converter.makeHtml(text);
  };

  let about = [];
  about.unshift(data[0]);
  data.map(post => {
    let obj = {};
    obj.label = post.name;
    subroutes.push(obj);
    about.push(post);
  });

  let active = 1;

  $: post = about[active];

  $: if (post) {
    let el = document.getElementById("container");
    let html = convertMarkdown(post.description);
    el ? (el.innerHTML = html) : "";
  }

  onMount(() => {
    post = about[active];
  });

  let navStyles = "pa1";
</script>

<style>
  div::-webkit-scrollbar {
    display: none;
  }

  #container {
    line-height: 2rem;
    font-size: 1rem;
    overflow: scroll;
    max-height: 100vh;
    padding-bottom: 30vh;
  }
</style>

<!-- find the url context and do If blocks -->

<PageWrapperWithMenu routes={subroutes} bind:active>
  {#if active !== null}
    <div id="container" class="h-100 pa3" />
  {/if}
</PageWrapperWithMenu>
