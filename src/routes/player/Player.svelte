<script>
  import { onMount } from "svelte";
  import { data as songs } from "./data";
  import { Back } from "components";
  import { Music } from "fragments";

  let active = Math.floor(Math.random() * songs.length);
  let playing;
  let currentSong = songs[active];
  let audio;

  const toggle = () => {
    audio.paused ? audio.play() : audio.pause();
    audio.paused ? (playing = false) : (playing = true);
  };

  const skip = (forward = true) => {
    if (forward) {
      active < songs.length - 1 ? active++ : (active = 0);
    } else {
      active > 0 ? active-- : (active = songs.length - 1);
    }
    currentSong = "";
    currentSong = songs[active];
    audio.load();
    audio.play();
    playing = true;
  };

  onMount(() => {
    audio.addEventListener(
      "ended",
      () => {
        setTimeout(() => {
          skip(true);
        }, 1000);
      },
      false
    );
  });
</script>

<style>
  img {
    padding: 0 0.1rem;
  }

  .controls {
    margin: 0 0.3rem;
  }

  .musicwrap {
    margin: 0 0.5rem -0.2rem 0.5rem;
  }
</style>

<div class="flex justify-end h-100 items-center">
  {#if currentSong}
    <audio id="audio" bind:this={audio}>
      <source src={currentSong.url} id="source" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  {/if}

  <div>{currentSong.name}</div>
  <div class="musicwrap">
    <Music />
  </div>
  <div class="controls w-25 justify-between h-50 flex">
    <img
      on:click={() => skip(false)}
      src="./img/music-previous.svg"
      alt="previous" />
    <img
      on:click={() => toggle()}
      src={`./img/music-${playing ? 'pause' : 'play'}.svg`}
      alt="Toggle Music" />
    <img on:click={() => skip()} src="./img/music-next.svg" alt="next" />
  </div>
</div>
