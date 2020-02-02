<script>
  export let content = "yeet";
  import { typewriter } from "animations";
</script>

<style>
  pre {
    font-size: 1em;
    line-height: 1.25em;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                      supported by Chrome, Opera and Firefox */
  }
</style>

{#if content}
  <pre class="tc">{content}</pre>
{/if}
