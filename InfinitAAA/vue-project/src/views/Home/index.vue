<script setup>
//用户信息
import { onMounted ,ref} from 'vue';
import useUserInfoStore from '../../stores/userInfo.js'
import { storeToRefs } from 'pinia'
import { Plus, CaretRight } from '@element-plus/icons-vue'

const userInfo = useUserInfoStore();
const  {info} = storeToRefs(userInfo);

const newSongList = ref([]);

const getNewSongList = async() => {
    const newsongUrl = ref(`http://localhost:3000/top/song?type=0`);
      try {
        const response = await fetch(newsongUrl.value, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' // 设置请求的源
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
        newSongList.value = data.data ? data.data.slice(0, 20) : ``;

      } catch (error) {
        console.error('获取新歌失败:', error);
      }
}

import currentsongStore from '../../stores/currentSong';
import currentListStore from '../../stores/currentList';
const currentSong = currentsongStore()
const currentList = currentListStore()
const playRecommend = (id) => {
    currentSong.songId = id
}

const addToCurrent = (row) => {
    const selectedProps = {
        album: row.album,
        songName: row.name,
        artist: row.artists[0].name,
        songid: row.privilege.id
    }
    currentList.addSongToCurrent(selectedProps)
}

onMounted(()=> {
    getNewSongList();
})

</script>

<template>
    <div class="recommend-box">
        <h1>Hi {{ info.name}} ,今日为你推荐</h1>
        <div class="newsong-box">
            <h2>新歌速递</h2>
            <div class="song-box">
                <el-table :data="newSongList" height="400px" class="songs" :show-header="false">
                    <el-table-column prop="album" label="封面" width="600px" >
                        <template v-slot="scopeP">
                            <el-image :src="scopeP.row.album.picUrl" style="width: 100px; height: 100px">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="歌名" width="300px" />
                    <el-table-column prop="artists[0].name" label="歌手" width="250px" />
                    <el-table-column label="播放" width="100px" prop="privilege">
                    <template v-slot="scope">
                        <el-button :icon="CaretRight" background="transparent" circle @click="playRecommend(scope.row.privilege.id),addToCurrent(scope.row)" />
                    </template>
                    </el-table-column>
                    <el-table-column label="添加" width="100px">
                    <template v-slot="scope">
                        <el-button :icon="Plus" background="transparent" circle />
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        
    </div>
</template>

<style>
    .recommend-box {
        margin-left: 50px;
    }

    

</style>