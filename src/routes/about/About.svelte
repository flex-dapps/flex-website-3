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
  p {
    line-height: 2rem;
    font-size: 1rem;
    margin: 0.5rem;
  }

  div {
    margin: 0.5rem 0;
  }
</style>

<!-- find the url context and do If blocks -->

<PageWrapperWithMenu routes={subroutes} bind:active>
  <div />
  {#if active !== null}
    <h1>{post.name}</h1>
    <div id="container" />
  {/if}
</PageWrapperWithMenu>
