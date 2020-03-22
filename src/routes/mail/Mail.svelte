<script>
  import { fly, fade } from "svelte/transition";
  import { getContext } from "svelte";
  import { Back } from "components";
  import { mobile } from "stores";

  let loaded = true;
  let finished = false;

  let active = 0;
  let errorMessage;

  let states = [
    {
      name: "name",
      message: "What do we call you?",
      placeholder: "Nicolas Cage",
      value: "",
      validation: name => {
        return typeof name === "string" || name instanceof String;
      }
    },
    {
      name: "email",
      message: "What is your email address?",
      placeholder: "nic.cage@sufferingbees.net",
      value: "",
      validation: function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },
    {
      name: "enquiry",
      message: "How can we help?",
      placeholder: "I have a problem that involves bees",
      value: "",
      validation: () => {
        return true;
      }
    }
  ];

  $: currentState = states[active];

  const showUserAnError = error => {
    errorMessage = error;
    setTimeout(() => {
      errorMessage = false;
    }, 3000);
  };

  const next = current => {
    let fieldIsValid = currentState.validation(currentState.value);
    if (fieldIsValid) {
      loaded = false;
      active++;
    } else {
      showUserAnError(("Invalid " + currentState.name).toUpperCase());
    }
    return;
  };
</script>

<style>
  input {
    border: none;
    border-bottom: 1px #a9e3b0 solid;
    text-transform: uppercase;
    color: #a9e3b0;
    background: none;
    font-size: 1.3em;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.25em;
  }
  input::placeholder {
    color: #a9e3b025;
  }

  input:focus {
    color: #a9e3b0;
    outline: none;
  }
  button {
    border: 1px #a9e3b0 solid;
    text-transform: uppercase;
    color: #a9e3b0;
    background: none;
    max-width: 600px;
    font-size: 1.5em;
  }

  /* .submit {
    border: 1px #a9e3b0 solid;
    margin-bottom: 1rem;
  } */
</style>

<div>

  <Back />
  <div class="flex justify-between pa3 w-100">
    {#if !$mobile}
      <div class="w-50">
        <h1>Want to get in touch?</h1>
        <p>We'll get back to you as soon as we can.</p>
        <a target="_blank" href="https://discord.gg/HVS7BVE">
          <p>
            Alternatively, chat to the Australian web3 community in our Discord
            server.
          </p>
        </a>
        <h1>Flex Dapps does not:</h1>
        <ul>
          <li>00. Do pro-bono work</li>
          <li>01. Do pro-bono work disguised as tokens</li>
          <li>02. Sign non-disclosure agreements simply to hear an idea</li>
        </ul>

      </div>
    {/if}
    {#if loaded && !finished}
      <div
        class="signup h-100 flex flex-column justify-start pa3"
        in:fade={{ duration: 500 }}
        out:fade={{ duration: 500 }}
        on:outroend={() => (loaded = true)}>
        <h1>{currentState.message}</h1>
        <input
          placeholder={currentState.placeholder}
          type="text"
          bind:value={currentState.value}
          name={currentState.name} />
        <button on:click={() => next(currentState)}>Next</button>
        {#if errorMessage}
          <div class="w-100 flex justify-center pa3">
            <h3 out:fade>{errorMessage}</h3>
          </div>
        {/if}
      </div>
    {:else if finished}
      <div class="w-100 h-100 flex flex-column justify-start pa3">
        <div class="submit">
          {#each states as state}
            <div class="flex justify-start pa2">
              <p>{state.name.toUpperCase()}: {state.value}</p>
            </div>
          {/each}
        </div>
        <button>Submit</button>
      </div>
    {/if}
  </div>

</div>

<!-- Invite people to Discord after completing the form -->
