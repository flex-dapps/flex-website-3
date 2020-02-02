<script>
  import { navigate } from "svelte-routing";
</script>

<style>
  .back-fragment {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
</style>

<div class="back-fragment" on:click={() => navigate('/')}>{'< Go Back'}</div>
