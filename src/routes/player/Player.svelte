<script>
  import { onMount } from "svelte";
  import { data as songs } from "./data";
  import { Back } from "components";
  import { Music } from "fragments";

  let active = 0;
  let playing;
  let currentSong = songs[active];

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
</script>

<style>
  .backContainer {
    position: absolute;
    left: 0;
  }
</style>

<div class="flex justify-between h-100 items-center">
  {#if currentSong}
    <audio id="audio">
      <source src={currentSong.url} id="source" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  {/if}

  <Music />

  <div>{currentSong.name}</div>
  <div class="controls w-25 h-50 flex justify-between">
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
