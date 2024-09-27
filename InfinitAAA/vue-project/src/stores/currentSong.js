import {defineStore} from 'pinia'
import {ref} from 'vue'
const currentsongStore = defineStore('currentsongInfo',()=>{
    //定义状态相关的内容

    const songId = ref(1442451766);
    const songInfo = ref({
      songName: 'songofmylife',
      singer: 'wla',
      album: 'aaa',
      time: '',
      albumCover: ''
  })
    const source = ref(``);
    const LRC = ref(``);

    const getDetail = async () => {
        const songDetailsUrl = ref(`http://localhost:3000/song/detail?ids=${songId.value}`);
        try {
            const response = await fetch(songDetailsUrl.value, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              },
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            console.log(data)
    
            const song = data.songs[0]; // API返回的数据结构中包含了歌曲详情信息
    
            songInfo.value.songName = song.name;
            songInfo.value.singer = song.ar[0].name;
            songInfo.value.album = song.al.name;
            songInfo.value.albumCover = song.al.picUrl;
          } catch (error) {
            console.error('获取歌曲详情失败:', error);
          }
    }

    const getAudio = async () => {
      const apiUrl = ref(`http://localhost:3000/song/url/v1?id=${songId.value}&level=exhigh`);
      try {
        const response = await fetch(apiUrl.value, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // 设置请求的源
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        source.value = data.data[0].url ? data.data[0].url : ``;

      } catch (error) {
        console.error('获取音源失败:', error);
      }

    }

    // 转换函数：将普通文本格式的歌词转换为 LRC 格式
    const convertToLRC = (lyrics) =>  {
      const lines = lyrics.split('\n');
      let lrcContent = '';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line !== '') {
          const timestamp = getTimestamp(line);
          const text = getText(line);

          if (timestamp !== null && text !== '') {
            lrcContent += `[${timestamp}]${text}\n`;
          }
        }
      }

      return lrcContent;
    }
    const getTimestamp = (line) => {
      const matches = line.match(/\[(\d{2}):(\d{2})\.(\d{3})]/);

      if (matches) {
        const minutes = parseInt(matches[1]);
        const seconds = parseInt(matches[2]);
        const milliseconds = parseInt(matches[3]);

        const totalMilliseconds = minutes * 60 * 1000 + seconds * 1000 + milliseconds;
        return formatTimestamp(totalMilliseconds);
      }

      return null;
    }
    const formatTimestamp = (milliseconds) => {
      const minutes = Math.floor(milliseconds / 60000);
      const seconds = Math.floor((milliseconds % 60000) / 1000);
      const ms = milliseconds % 1000;

      return (
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (ms < 10 ? '00' : ms < 100 ? '0' : '') + ms
      );
    }
    const getText= (line) => {
      return line.replace(/\[\d{2}:\d{2}\.\d{3}\]/, '').trim();
    }

    const getLyrics = async () => {
      const lyricsUrl = ref(`http://localhost:3000/lyric?id=${songId.value}`);
      let savedLRC = '';
      try {
        const response = await fetch(lyricsUrl.value, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // 设置请求的源
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const lyrics = data.lrc ? data.lrc.lyric : '暂无歌词';
        LRC.value = convertToLRC(lyrics);
      } catch (error) {
        console.error('获取歌词失败:', error);
      }
    }
    

    return {
        songId,
        songInfo,
        source,
        LRC,
        getDetail,
        getAudio,
        getLyrics
    }

},{persist:true})

export default currentsongStore;