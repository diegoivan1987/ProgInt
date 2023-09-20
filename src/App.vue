<template>
  <div id="app">
    <div class="container">
      <h1>Reproductor de musica</h1>
      <audio ref="audioPlayer" :src="currentTrack.url" @timeupdate="updateProgress"></audio>
      <div class="controls">
        <button @click="previousTrack">&#9664; Prev</button>
        <button @click="play">&#9654; Play</button>
        <button @click="pause">|| Pause</button>
        <button @click="nextTrack">Next &#9654;</button>
      </div>
      <div class="status">
        <p>Now Playing: {{ currentTrack.title || extractFileName(currentTrack.url) }}</p>
        <input type="range" class="progress-bar" min="0" :max="duration" v-model="currentTime" @input="seek">
        <div class="volume-control">
          <label>Volume:</label>
          <input type="range" min="0" max="1" step="0.01" v-model="volume">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
      volume: 0.5,
      tracks: [
        { url: "/muse-hysteria-official-music-video.mp3" },
        { url: "/muse-new-born.mp3" },
        { url: "/muse-the-handler-official-lyric-video.mp3" },
      ],
    };
  },
  computed: {
    currentTrack() {
      return this.tracks[this.currentTrackIndex];
    },
  },
  methods: {
    play() {
      this.$refs.audioPlayer.volume = this.volume;
      this.$refs.audioPlayer.play();
      this.duration = Math.floor(this.$refs.audioPlayer.duration);
    },
    pause() {
      this.$refs.audioPlayer.pause();
    },
    nextTrack() {
      this.currentTrackIndex++;
      if (this.currentTrackIndex >= this.tracks.length) {
        this.currentTrackIndex = 0;
      }
      this.play();
    },
    previousTrack() {
      this.currentTrackIndex--;
      if (this.currentTrackIndex < 0) {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.play();
    },
    updateProgress() {
      this.currentTime = Math.floor(this.$refs.audioPlayer.currentTime);
      this.duration = Math.floor(this.$refs.audioPlayer.duration);
    },
    seek() {
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },
    extractFileName(url) {
      return url ? url.split('/').pop().split('.')[0] : '';
    }
  },
  watch: {
    volume(newVolume) {
      this.$refs.audioPlayer.volume = newVolume;
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
  background: #f0f0f0;
  height: 100vh;
}

.container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.status p {
  font-size: 16px;
  margin: 15px 0;
}

.progress-bar {
  width: 100%;
}

.volume-control {
  display: flex;
  justify-content: center;
  align-items: center;
}

.volume-control label {
  margin-right: 10px;
}
</style>
