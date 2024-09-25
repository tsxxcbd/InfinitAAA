<script lang="ts" setup>
import { onMounted,  ref } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import { VideoPause, VideoPlay } from '@element-plus/icons-vue'
import currentsongStore from '../../../stores/currentSong.js'
import currentListStore from '../../../stores/currentList.js'
import {useRouter} from 'vue-router'
import { RTL } from 'element-plus/es/components/virtual-list/src/defaults'
import lkSelect from '../../../views/lk-select.vue'

const router = useRouter()

const currentSong = currentsongStore();

const songId = ref(currentSong.songId);



//进度条相关
const duration = ref('00:00');
const currentDuration = ref('00:00');
const audio = ref();
const volume = ref(1);
const paused = ref(false);  
const isMoveIn = ref(false);
const progress = ref();
const currentProgress = ref();
const circle = ref();

const clickProgress = (e) => {
    if (!isMoveIn.value || !audio.value.paused) {
        updateProgress(e.offsetX)
      }
}

const updateProgress = (MoveX) => {
    //当前移动的位置 = 当前移动的位置 / 当前进度条的可视长度    //this.$refs.progress.clientWidth 注意一定要拿总长度 否则会拿进度条已经走过的长度
    let clickProgress = (MoveX / progress.value.clientWidth)
    //设置播放的时间 = 总时长 * 当前点击的长度
    audio.value.currentTime = audio.value.duration * clickProgress
    //设置移动的位置
    currentProgress.value.style.width = MoveX + 'px'
    circle.value.style.left = MoveX - (circle.value.clientWidth / 2) + 'px'
}


const handleMouseup = () => {
    setTimeout(() => {
        audio.value.play()
        paused.value = false
        isMoveIn.value = false
      }, 200)
}

const handleMousedown = () => {
    audio.value.pause()
    paused.value = true
    isMoveIn.value = true
    //进度条 左 边距离页面左边的距离 移动最小值
    let moveMin = progress.value.offsetParent.offsetLeft + progress.value.offsetLeft
    //进度条 右 边距离页面左边的距离 移动最大值
    let moveMax = progress.value.offsetParent.offsetLeft + progress.value.offsetLeft + progress.value.clientWidth
    //小圆圈的宽度
    let circleWidth = (circle.value.clientWidth / 2)
    let moveX = (e) => {
    if (e.pageX >= moveMax) {
        return
    } else if (e.pageX <= moveMin) {
        return
    }
    circle.value.style.left = e.pageX - moveMin - circleWidth + 'px'
    updateProgress(e.pageX - moveMin)
    }
    //获取当前鼠标的位置 X
    document.addEventListener('mousemove', moveX)
    //鼠标弹起来
    document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', moveX)
    })
}


const getDuration = () => {
    duration.value = timeFormat(audio.value.duration)
    audio.value.volume = volume 
      //监听音量的变化
      // this.audio.addEventListener('volumechange',(value)=>{
      //   console.log(this.audio.volume)
      // })
}

const timeFormat = (number: string | number): string => {
    const parsedNumber = typeof number === 'string' ? parseInt(number, 10) : number;
    if (isNaN(parsedNumber)) {
        return '00:00'; 
    }

    const minute = parseInt(String(parsedNumber / 60));
    const second = parseInt(String(parsedNumber % 60));
    const formattedMinute = minute >= 10 ? String(minute) : "0" + minute;
    const formattedSecond = second >= 10 ? String(second) : "0" + second;

    return formattedMinute + ":" + formattedSecond;
}

const updateTime = () => {
    if (!progress.value) return
    currentDuration.value = timeFormat(audio.value.currentTime)
    //如果不是正在移动 和 没有暂停播放就执行
    if (!isMoveIn.value || !audio.value.paused) {
    // 设置当前时间
    let MoveX = progress.value.clientWidth * (audio.value.currentTime / audio.value.duration)
    //播放时更新距离
    currentProgress.value.style.width = MoveX + 'px'
    circle.value.style.left = MoveX - (circle.value.clientWidth / 2) + 'px'
    }
}



//切换歌曲相关
const previousSong = () => {

}

const nextSong = () => {

}

const name = ref(currentSong.songInfo.songName);


onMounted(()=>{
    currentSong.getDetail();
   console.log(name.value);
    console.log(audio.value)
    console.log(progress.value)
})


const handlePauseOrPlay = () => {
    audio.value.paused ? audio.value.play() : audio.value.pause()
    paused.value = !paused.value
}


//音量相关
const volumeVisible = ref(false)
const progressY = ref()
const currentProgressY = ref()
const circleY = ref()

const handleVolumeMousedown = (e) => {
      const moveMin = progressY.value.getBoundingClientRect().top;
      const moveMax = progressY.value.getBoundingClientRect().bottom;

      const circleHeight = circleY.value.clientHeight / 2;

      const change = e.movementY > 0 ? -1 : 1; // Change direction based on mouse movement

      const moveY = (e) => {
        e.preventDefault();
        if (e.pageY >= moveMax) {
          return;
        } else if (e.pageY <= moveMin) {
          return;
        }
        circleY.value.style.top = e.pageY - moveMin - circleHeight + 'px';
        updateVolumeProgress(e.pageY - moveMin);
      };

      document.addEventListener('mousemove', moveY);
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveY);
      });

}

const updateVolumeProgress = (MoveY) => {
      const totalHeight = progressY.value.clientHeight; // 音量条总高度
      const circleHeight = circleY.value.clientHeight; // 圆圈高度
      const maxVolume = 1; // 最大音量
      const minVolume = 0; // 最小音量

      // 计算音量的百分比
      let volumePercentage = (totalHeight - MoveY) / totalHeight;

      // 将音量百分比转换为在指定范围内的音量值
      let volume = minVolume + volumePercentage * (maxVolume - minVolume);

      // 确保音量值在有效范围内
      volume = Math.max(minVolume, Math.min(maxVolume, volume));

      // 更新音量值
      audio.value.volume = volume;
      volume = volume;

      // 更新音量条高度
      currentProgressY.value.style.height = `${MoveY}px`;

      // 更新小圆圈位置
      circleY.value.style.top = `${MoveY - circleHeight / 2}px`;
}

const drawer = ref(false)

//拉出播放列表
const showDrawer = () => {
    drawer.value = true
}
const listStore = currentListStore()

const handleRowDoubleClick = (row) => {
    songId.value = row.songid
}


</script>





<template>
    <audio @canplay="getDuration" controls @timeupdate="updateTime" v-show="false" ref="audio" :src="currentSong.source" />
    <!-- <player :currentTime="audio.currentTime" />  -->

    <el-drawer v-model="drawer" title="播放列表" :direction="RTL" size="400">
        <span>
        <p class="number">{{ listStore.currentList.length }}首歌曲</p>
        <el-table height="600px" :data="listStore.currentList" style="width: 100%" :show-header="false"
            :row-style="{ height: '100px' }" @row-dblclick="handleRowDoubleClick">
            <el-table-column label="Details" width="360">
            <template #default="{ row }">
                <div class="song-details">
                <div class="name-singer" width="220px">
                    <div class="name">{{ row.songName }}</div>
                    <div class="singer">{{ row.artist }}</div>
                </div>
                <div>
                    <el-button type="primary" :icon="CloseBold" class="delete" background="transparent" circle
                    @click="listStore.deleteSong(row.id)"></el-button>
                </div>
                </div>
            </template>
            </el-table-column>
        </el-table>
        </span>
    </el-drawer>

    <el-footer class="bottom">
        <div class="music-player">
            <div class="song-info">
                <p @click="$router.push('/player')">{{ currentSong.songInfo.songName + " - " + currentSong.songInfo.singer }}</p>
                <p class="Time">{{ currentDuration + "/" + duration }}</p>

            </div>
            <div class="progress" width="1373px" ref="progress" @click="clickProgress" @mouseup="handleMouseup">
                <div class="currentProgress" ref="currentProgress">
                    <span class="circle" ref="circle" @mousedown="handleMousedown"></span>
                </div>
            </div>

            <div class="icons">
                <div class="left">
                    <el-button type="primary" circle class="iconfont icon-comment" @click="$router.push('/comment')" />
                </div>

                <div class="middle">
                    <el-button type="primary" circle class="iconfont icon-shangyishou"
                        @click="previousSong"></el-button>
                    <span class="play" @click="handlePauseOrPlay">
                        <el-icon size="35px" color="#F2F2F2">
                            <video-pause v-if="!paused" />
                            <video-play v-else="paused" />
                        </el-icon>
                    </span>

                    <el-button type="primary" circle class="iconfont icon-xiayishou"
                        @click="nextSong"></el-button>
                </div>

                <div class="right">
                    <div class="volumePanel">
                        <lk-select v-model:visible="volumeVisible">
                            <div class="progressY" ref="progressY">
                            <div class="currentProgressY" ref="currentProgressY">
                                <span class="circleY" ref="circleY" @mousedown="handleVolumeMousedown"></span>
                            </div>
                            </div>
                            <template v-slot:reference>
                                <el-button type="primary" circle class="iconfont icon-shengyin volume" v-if="volume"></el-button>
                                <el-button type="primary" circle class="iconfont icon-shengyin volume" v-else></el-button>
                            </template>
                        </lk-select>
                    </div>

                    <el-button type="primary" circle class="iconfont icon-sort" @click="showDrawer" />
                </div>
            </div>

        </div>

    </el-footer>
</template>



<style lang="less" scoped>

.el-footer {
    width: 1420px;
    position: fixed;
    bottom: 0;
    left: 50%;
    height: 160px;
    transform: translate(-50%, 0);

    /* 底部播放 */
    .song-info {
        color: #B6B6B6;
        font-size: 16px;
        display: flex;

    }

    .Time {
        position: absolute;
        right: 20px;
    }

    .music-player {
        flex-direction: column;
        margin-left: 5px;
    }

    .custom-slider .el-slider__runway {
        height: 2px;
        /* Adjust the height of the track */
        width: 1380px;
        background-color: #B6B6B6;
    }

    .custom-slider .el-slider__bar {
        height: 2px;
        background-color: #2E8CAC;
    }

    .custom-slider .el-slider__button {
        width: 10px;
        /* Adjust the width of the thumb */
        height: 10px;
        /* Adjust the height of the thumb */
        margin-top: -4px;
        /* Center the thumb vertically within the track */
        margin-left: -5px;
        /* Center the thumb horizontally within the track */
    }

    .icons {
        display: flex;
        margin-top: 35px;
    }

    .bottom-icon {
        font-size: 35px;
        background-color: transparent;
        border: none;
        color: #F2F2F2;

    }

    .icon-follow {
        background-color: transparent;
    }

    .iconfont {
        background-color: transparent;
        border: none;
        font-size: 35px;
    }

    .left {
        display: flex;
        justify-content: space-around;
        width: 150px;
    }


    .middle {
        position: relative;
        left: 27%;
        display: flex;
        justify-content: space-around;
        width: 300px;
    }



    .right {
        position: relative;
        left: 56%;
        justify-content: space-between;
        display: flex;
        justify-content: space-around;
        width: 150px;
    }


    ::v-deep .el-drawer {
        background: #000;
    }

    ::v-deep .el-drawer p {
        margin-left: 10px;
    }

    .el-drawer__title {
        margin-top: 50px;
        margin-left: 5px;
        font-size: 24px;
        color: #F2F2F2;
    }

    .song-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    /* Styles for name and singer column */
    .name-singer {
        display: flex;
        flex-direction: column;
    }

    /* Apply specific styles to each part of the song details */
    .name {
        color: #F2F2F2;
        font-size: 18px;
    }

    .singer {
        margin-top: 20px;
        font-size: 16px;
        color: #AAAAAA;
    }

    .long {
        font-size: 18px;
        color: #AAAAAA;
        /* Change color of long to differentiate */
    }

    .progress,
    .progressY {
        height: 2px;
        border-radius: 2px;
        background-color: #DADFEA;
        cursor: pointer;

        .currentProgress {
            position: relative;
            height: 100%;
            width: 0;
            background-color: #2E8CAC;
            border-radius: 2px;


            .circle {
                position: absolute;
                right: -6px;
                top: -2px;
                display: inline-block;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                border: 1px solid #2E8CAC;
                background-color: #fff;

                &:hover {
                    width: 7px;
                    height: 7px;
                    top: -3px;
                    border-radius: 50%;
                }
            }
        }
    }

    .circleY {
        position: absolute;
        right: -6px;
        top: -2px;
        display: inline-block;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 1px solid #2E8CAC;
        background-color: #fff;

        &:hover {
            width: 7px;
            height: 7px;
            top: -3px;
            border-radius: 50%;
        }
    }

    .progressY {
        width: 5px;
        height: 60px;
        margin-left: 12px;
        margin-bottom: 20px;
        bottom: calc(100% + 15px);
        position: absolute;
        background-color: #2E8CAC;


        .currentProgressY {
            height: 100%;
            width: 100%;
            position: relative;
            background-color: #fff;

            .circleY {
                position: absolute;
                right: -3px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                transition: top 0.2s ease-in-out;
                /* 添加过渡效果 */

                &:hover {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }
            }
        }
    }

    .custom-message-box {
        p {
            color: black;
        }
    }

    el-dialog {
        p {
            color: black;
        }
    }

}






</style>
