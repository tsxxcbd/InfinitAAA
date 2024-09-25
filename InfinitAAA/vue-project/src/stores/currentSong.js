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
    const source = ref();

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
    

    return {
        songId,
        songInfo,
        source,
        getDetail
    }

},{persist:true})

export default currentsongStore;