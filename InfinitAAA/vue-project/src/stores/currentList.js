import {defineStore} from 'pinia'
import {ref} from 'vue'
import { getSongList } from '../api/playlist'
import { deleteSongFromList } from '../api/playlist'

const currentListStore = defineStore('currentListStore',()=>{
    //定义状态相关的内容

    const currentList = ref([])

    //获取播放列表中的歌曲
    const getnowSonglist = () => {
        try {
            getSongList()
                .then(results => {
                // 假设 searchService 返回的是包含歌曲信息的数组
                currentList = results.map(item => ({
                    songName: item.songName,
                    artist: item.artist,
                    album: item.album,
                    songid: item.songid,
                }))
                })
                .catch(error => {
                console.error("搜索错误：", error);
                });
        } catch (e) {
            alert("获取数据失败" + e.message)
        }
    }

    const deleteSong = (id) => {
        try {
            deleteSongFromList(id, 0);
            getnowSonglist();
        } catch (e) {
            alert("获取数据失败" + e.message)
        }
    }

    return {
        currentList,
        getnowSonglist,
        deleteSong
    }

},{persist:true})

export default currentListStore;