<script lang="ts" setup>
import { ref, onMounted, defineProps, reactive, provide, inject, watch } from 'vue'

import currentsongStore from '../../stores/currentSong.js'
import { storeToRefs } from 'pinia';

const currentSong = currentsongStore();
const {LRC} = storeToRefs(currentSong);


interface LyricsLine {
  time: number;
  words: string;
}


const lrcData = ref([] as { time: number; words: string }[]);
const contextLines = ref(11);
const displayedLyrics = ref([] as LyricsLine[]);


const formatLrc = () => {
  console.log(111)

  if (!LRC.value) {
    displayedLyrics.value = [];
    return;
  }
  const strLrc = LRC.value.split('\n');
  const arr: { time: number; words: string }[] = [];
  console.log(222)

  for (let i = 0; i < strLrc.length; i++) {
    const str = strLrc[i];
    const parts = str.split(']');
    if (parts.length > 1) {
      const timeStr = parts[0].substring(1);
      const obj = {
        time: formatTime(timeStr),
        words: parts[1],
      };
      arr.push(obj);
    }
  }
  lrcData.value = arr;
  console.log(lrcData.value+"555")
  updateDisplayedLyrics(0);
};

const formatTime = (time: string) => {
  const parts = time.split(':');
  const minutes = parseInt(parts[0]);
  const seconds = parseFloat(parts[1]);
  return minutes * 60 + seconds;
};

const audioTime = (e: Event) => {
  const time = (e.target as HTMLAudioElement).currentTime;
  const currentLineIndex = findCurrentLineIndex(time);

  if (currentLineIndex !== -1) {
    const startIndex = Math.max(currentLineIndex - 5, 0);
    const endIndex = Math.min(currentLineIndex + 5, lrcData.value.length - 1);
    displayedLyrics.value = lrcData.value.slice(startIndex, endIndex + 1);
  }
};

const findCurrentLineIndex = (time: number): number => {
  for (let i = 0; i < lrcData.value.length - 1; i++) {
    if (time >= lrcData.value[i].time && time < lrcData.value[i + 1].time) {
      return i;
    }
  }
  return lrcData.value.length - 1;
};

const updateDisplayedLyrics = (currentTime: number) => {
  const currentIndex = lrcData.value.findIndex((line) => line.time >= currentTime);

  if (currentIndex !== -1) {
    const startIndex = Math.max(0, currentIndex - contextLines.value);
    const endIndex = Math.min(
      lrcData.value.length - 1,
      currentIndex + contextLines.value
    );
    displayedLyrics.value = lrcData.value.slice(startIndex, endIndex + 1);
  }
};

onMounted(() => {
  currentSong.getLyrics();
  formatLrc();
  const audio = document.querySelector('audio');

  if (audio) {
    audio.addEventListener('timeupdate', audioTime);
  }
});

</script>

<template>
  <div class="player">
    <el-image class="albumCover" style="width: 420px; height: 420px" :src=currentSong.songInfo.albumCover fit="cover" />
    <div class="songInfo">
      <p class="songName">{{ currentSong.songInfo.songName }}</p>
      <span class="otherInfo">
        <p class="singer">歌手：{{ currentSong.songInfo.singer }} </p>
        <p class="album">专辑：{{ currentSong.songInfo.album }}</p>
      </span>

       <div class="lyrics">
        <p v-for="(line, index) in displayedLyrics" :key="index">{{ line.words }}</p>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.player {
  display: flex;

}

.songInfo {
  margin-left: 150px;
  text-align: center;
  justify-items: center;
  width: 600px;
}



.albumCover {
  margin-top: 60px;
  margin-left: 120px;
}

.songName {
  font-size: 28px;
  color: #F2F2F2;
}

.singer,
.album {
  color: #797979;
  font-size: 14px;
}


.lyrics {
  text-align: center;
  margin-top: 30px;
}
</style>