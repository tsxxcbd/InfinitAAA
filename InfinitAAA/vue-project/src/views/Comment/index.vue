<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import currentsongStore from '../../stores/currentSong.js'

    const currentSong = currentsongStore();

    const songId = currentSong.songId;

    const url = currentSong.songInfo.albumCover;

    const commentData = ref([]);

    async function fetchCommentInfo() {
        console.log(songId+"aaaa")
        const commentUrl = `http://localhost:3000/comment/music?id=${songId}&limit=1`; // 替换为实际的评论API地址
        try {
            const response = await fetch(commentUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log(data)

            const comments = data.hotComments || []; // 确保 comments 是一个有效的数组

            const newComments = comments.map(comment => ({
                userAvatar: comment.user.avatarUrl,
                userName: comment.user.nickname,
                date: comment.timeStr,
                userComment: comment.content,
            }));


            commentData.value = newComments;
        } catch (error) {
            console.error('获取评论信息失败', error);
        }
    };

    onMounted(async () => {
        await fetchCommentInfo();
    });

</script>


<template>
    <div class="comment-box">
        <div class="albumInfo">
            <el-image style="width: 150px; height: 150px" :src="url" fit="cover" />
            <p>{{ currentSong.songInfo.songName }}</p>

        </div>
        <div class="comment-table">
            <el-table  :data="commentData"  :show-header="false" style="width: 1300px ;margin: 0 auto;margin-top: 30px;"
            :row-style="{ height: '125px' }">
            <el-table-column label="commentDetails">
                <template #default="{ row }">
                    <div class="comment-details">
                        <div style="display: flex">
                            <el-image style="width: 70px; height:70px" :src="row.userAvatar" class="userAvatar" />
                        </div>
                        <div class="userName-date-userComment">
                            <div class="userName">{{ row.userName }}</div>
                            <div class="date">{{ row.date }}</div>
                            <div class="userComment">{{ row.userComment }}</div>

                        </div>

                    </div>
                </template>
            </el-table-column>
        </el-table>
        </div>

    </div>


</template>

<style lang="less" scoped>
    .comment-box {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 800px;
    }

    .albumInfo {
        display: flex;
        flex-direction: row;
        margin-left: 100px;
        margin-top: 20px;
        text-align: center;
    }

    .albumInfo p {
        color: #F2F2F2;
        font-size: 28px;
        margin-left: 80px;
        margin-top: 60px;
    }

    .comment-table {
        margin: 0 auto;
        display: flex;
        justify-items: center;
    }

    .comment-details {
        display: flex;
    }

    .userAvatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-left: 30px;
    }

    .userName-date-userComment {
        margin-left: 40px;
    }

    .userName {
        font-size: 14px;
        color: #AAAAAA;
    }

    .date {
        font-size: 14px;
        color: #333333;

    }

    .userComment {
        font-size: 15px;
        color: #AAAAAA;
    }
</style>