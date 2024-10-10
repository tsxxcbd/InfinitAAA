import {defineStore} from 'pinia'
import {ref} from 'vue'
import useUserInfoStore from './userInfo.js'
import {                
    deleteLikeList,
  deleteCreateListAPI,
  addSongIntoList,getLikeSongsAPI,getLikeListAPI,getCreateListAPI,
    addCreateListAPI
 } from '../api/playlist'

const useListStore = defineStore('useListStore',()=>{
    //定义状态相关的内容
    const userStore = useUserInfoStore()

    const likeSongs = ref([])
    const likeList = ref([])
    const createList = ref([])

    const getLikeSongs = async()=>{
        console.log("55555")
        const res = await getLikeSongsAPI(userStore.info.id);
        likeSongs.value = res
    }

      
    const getLikeList = async()=>{
        const res = await getLikeListAPI(userStore.info.id);
        likeList.value = res
    }


    const getCreateList = async()=>{
        const res = await getCreateListAPI(userStore.info.id);
        createList.value = res
    }

    const delCreateList = async (id) => {
        await deleteCreateListAPI(id);
        await getCreateListAPI(userStore.info.id);
    }

    const addCreateList = async(data) => {
        const res = await addCreateListAPI(data)
        await getCreateListAPI(userStore.info.id);
    } 
      


    return {
        likeSongs,
        likeList,
        createList,
        getLikeList,
        getLikeSongs,
        getCreateList,
        delCreateList,
        addCreateList
    }

},{persist:true})

export default useListStore;
