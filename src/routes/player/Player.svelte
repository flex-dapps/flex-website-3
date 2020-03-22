<script>
  import data from "./data";
  import { Back } from "components";
  import { Music } from "fragments";
  let songs = data;
  console.log(data);

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

<div class="w-100 h-100 flex justify-between items-start">
  {#if currentSong}
    <audio id="audio">
      <source src={currentSong.url} id="source" type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  {/if}
  <div class="backContainer">
    <Back />
  </div>

  <div class="h-100 w-100 flex flex-column justify-center items-center">
    <div />
    <div class="w-75 h-50">
      <Music />
    </div>

    <h1>{currentSong.name}</h1>
    <div class="controls w-25 flex justify-between">
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
  <div />
</div>
