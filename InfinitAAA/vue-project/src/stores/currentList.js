import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSongList } from '../api/playlist'
import { deleteSongFromList } from '../api/playlist'

const currentListStore = defineStore('currentListStore', () => {
    //定义状态相关的内容

    const currentList = ref([])

    const currentFlag = ref(0)

    //获取播放列表中的歌曲
    // const getnowSonglist = () => {
    //     try {
    //         getSongList()
    //             .then(results => {
    //             // 假设 searchService 返回的是包含歌曲信息的数组
    //             currentList.value = results.map(item => ({
    //                 songName: item.songName,
    //                 artist: item.artist,
    //                 album: item.album,
    //                 songid: item.songid,
    //             }))
    //             })
    //             .catch(error => {
    //             console.error("搜索错误：", error);
    //             });
    //     } catch (e) {
    //         alert("获取数据失败" + e.message)
    //     }
    // }

    const addSongToCurrent = async (song) => {
        await currentList.value.push(song)
    }

    const deleteSong = async (id) => {
        const foundIndex = currentList.value.findIndex(item => item.id === id);

        if (foundIndex !== -1) {
            currentList.value.splice(foundIndex, 1);
            console.log(`Song with id ${id} removed from the list.`);
        } else {
            console.log(`Song with id ${id} not found in the list.`);
        }
    }

    return {
        currentFlag,
        currentList,
        //getnowSonglist,
        deleteSong,
        addSongToCurrent
    }

}, { persist: true })

export default currentListStore;