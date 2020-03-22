<script>
  import { navigate } from "svelte-routing";
</script>

<style>
  .back-text {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  .back-text:hover {
    background: #a9e3b0;
    color: #2a333e;
  }
</style>

<div class="flex justify-start" on:click={() => navigate('/')}>
  <div class="back-text">{'< Go Back'}</div>
</div>
