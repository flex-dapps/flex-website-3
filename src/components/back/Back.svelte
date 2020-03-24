<script>
  import { navigate } from "svelte-routing";
  export let mobile;
</script>

<style>
  .back-text {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  .back-text:hover {
    background: #a9e3b0;
    color: #2a333e;
    cursor: pointer;
  }
  .mobile {
    border-bottom: 1px solid #a9e3b0;
    padding-bottom: 1rem;
    padding-left: 1rem;
  }
</style>

<div class="flex justify-start" on:click={() => navigate('/')} class:mobile>
  <div class="back-text">{'< Go Back'}</div>
</div>
