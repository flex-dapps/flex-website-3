<script>
  import { fade } from 'svelte/transition'
  import { get } from 'svelte/store'
  import { onMount } from 'svelte'
  import { Back, Nav } from 'components'
  import { mobile, keys } from 'stores'

  let loaded = true
  let finished = false
  let thanks = false
  let back = [{ label: '< Go Back', route: '/' }]
  let fixedMobile

  let active = 0
  let errorMessage
  let inputEl

  let states = [
    {
      name: 'email',
      key: '_replyto',
      message: 'What is your email address?',
      placeholder: 'nic.cage@sufferingbees.net',
      value: '',
      validation: function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).trim().toLowerCase())
      },
    },
    {
      name: 'enquiry',
      message: 'How can we help?',
      placeholder: 'I have a problem that involves bees',
      value: '',
      key: 'message',
      validation: () => {
        return true
      },
    },
    {
      name: 'name',
      message: 'What do we call you?',
      placeholder: 'Nicolas Cage',
      value: '',
      key: 'name',
      validation: (name) => {
        return typeof name === 'string' || name instanceof String
      },
    },
  ]
  let state = {}

  $: currentState = states[active]

  async function submit() {
    finished = false
    thanks = true
    try {
      const res = await (
        await fetch(`https://formspree.io/mkngparz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json ',
          },
          body: JSON.stringify({
            state,
          }),
        })
      ).JSON()
      return res
    } catch (e) {
      throw e
    }
  }

  const showUserAnError = (error) => {
    errorMessage = error
    setTimeout(() => {
      errorMessage = false
    }, 3000)
  }

  const next = (current) => {
    let fieldIsValid = currentState.validation(currentState.value)

    if (fieldIsValid) {
      state[currentState.key] = currentState.value
      loaded = false
      active < states.length - 1 ? active++ : (finished = true)
    } else {
      showUserAnError(('Invalid ' + currentState.name).toUpperCase())
    }
    return
  }

  onMount(() => {
    window.onkeydown = (k) => {
      if (k.keyCode === keys.enter) {
        return next(currentState)
      }
    }
    fixedMobile = get(mobile)
  })
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
</style>

<div>
  {#if fixedMobile}
    <Nav left={true} routes={back} mobile={true} active={false} />
  {:else}
    <Back />
  {/if}
  <div class="flex justify-between pa3 w-100">
    {#if !fixedMobile && !thanks}
      <div class="w-50 pa3">
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
        </ul>
      </div>
    {/if}
    {#if loaded && !finished && !thanks}
      <div
        class={`signup h-100 flex flex-column justify-start pa3 ${fixedMobile ? 'w-100' : 'w-50'}`}
        in:fade={{ duration: 500 }}
        out:fade={{ duration: 500 }}
        on:introend={() => inputEl.focus()}
        on:outroend={() => (loaded = true)}>
        <h1>{currentState.message}</h1>
        <input
          placeholder={currentState.placeholder}
          type="text"
          bind:value={currentState.value}
          name={currentState.name}
          bind:this={inputEl} />
        <button on:click={() => next(currentState)}>Next</button>
        {#if errorMessage}
          <div class="w-100 flex justify-center pa3">
            <h3 out:fade>{errorMessage}</h3>
          </div>
        {/if}
      </div>
    {/if}
    {#if loaded && finished}
      <div
        in:fade={{ duration: 500 }}
        class={`h-100 flex flex-column justify-start pa3 ${fixedMobile ? 'w-100' : 'w-50'}`}>
        <div class="submit">
          {#each states as state}
            <div class="flex flex-column justify-start pa2">
              <p>{state.name.toUpperCase()}: {state.value}</p>
            </div>
          {/each}
        </div>
        <button on:click={() => submit()}>Submit</button>
      </div>
    {/if}
    {#if loaded && thanks}
      <div in:fade={{ duration: 500 }}>
        <h1>Thanks for reaching out!</h1>
        <p>We'll get back to you as soon as we can.</p>
        <br />
        <a target="_blank" href="https://discord.gg/HVS7BVE">
          <p>
            If you just can't wait, chat to the Australian web3 community in our
            Discord server.
          </p>
        </a>
        <br />

        <p>
          We would be thrilled if you took the time to read everything on this
          website. It has been carefully written for you.
        </p>
      </div>
    {/if}
  </div>
</div>

<!-- just create a ready to submit state and prefill the form and submit it  -->

<!-- Invite people to Discord after completing the form -->
