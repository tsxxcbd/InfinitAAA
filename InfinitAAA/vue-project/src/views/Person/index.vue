<script lang="ts" setup>
import { VueElement, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'



const hhhName = ref('third')
const likeName = ref('third1')
import {
  Delete, RefreshRight, Plus
} from '@element-plus/icons-vue'

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const handleClick1 = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}


import { useRouter } from 'vue-router'

const router = useRouter()






let LikeSongData = [];
let LikeListsData = [];
let CreateListsData = [];
let User = { id: "10" };
let DeleteCreatedialogVisible = ref(false);
let DeletedialogVisible = ref(false);
let AdddialogVisible = ref(false)
let currentlistid = "";
let addcurrentsongid = "";
let addcurrentlistid = "";
let addSongTolistdialogVisible = ref(false);
import { reactive } from 'vue'
import type { FormProps } from 'element-plus'

const labelPosition = ref<FormProps['labelPosition']>('right')

const formLabelAlign = reactive({
  name: '',
  profile: '',
})


import {
  queryUserLikeLists, queryUserCreateLists,
  queryUserLikeSong, deleteLikeList,
  deleteCreateList, addCreateList,
  addSongIntoList
} from '../../api/playlist.js'

const query = async () => {
  try {

    LikeListsData = await queryUserLikeLists(User.id)
    CreateListsData = await queryUserCreateLists(User.id);
    LikeSongData = await queryUserLikeSong(User.id);

  } catch (e) {
    alert("获取数据失败" + e.message)
  }
}

const deletelikeButton = async () => {

  try {

    console.log(currentlistid);

    deleteLikeList(currentlistid);
    query();
    DeletedialogVisible = ref(false)

  } catch (e) {
    alert("获取数据失败" + e.message)
  }

}

const deletecreateButton = async () => {
  try {
    console.log(currentlistid);

    deleteCreateList(currentlistid);
    query();
    DeleteCreatedialogVisible = ref(false)

  } catch (e) {
    alert("获取数据失败" + e.message)
  }

}

const addcreateButton = async () => {
  try {

    addCreateList(formLabelAlign.name, formLabelAlign.profile, User.id)
    query();
    AdddialogVisible = ref(false)

  } catch (e) {
    alert("获取数据失败" + e.message)
  }

}

const addSongToList = async () => {
  try {
    console.log(addcurrentsongid);
    console.log(addcurrentlistid);

    addSongIntoList(addcurrentsongid, addcurrentlistid);
    query();
    addSongTolistdialogVisible = ref(false)

  } catch (e) {
    alert("获取数据失败" + e.message)
  }

}






//上部用户信息
import useUserInfoStore from '../../stores/userInfo.js'

const userInfo = useUserInfoStore();



</script>

<template>

  <div class="person-box">
    <div class="user2">
      <el-image style="width: 120px; height: 120px" :src="userInfo.info.photo" class="avatar2" />
      <h4 class="username2">{{ userInfo.info.name }}</h4>
      <el-button class="refresh" :icon="RefreshRight" circle @click="query()"></el-button>
      <el-button class="refresh" :icon="Plus" circle @click="AdddialogVisible = true"></el-button>
    </div>

    <div class="person-pages">
      <el-tabs v-model="hhhName" class="my-tabs" @tab-click="handleClick">
        <el-tab-pane label="我喜欢" name="first">
          <el-tabs v-model="likeName" class="like-tabs" @tab-click="handleClick1">
            <el-tab-pane label="歌曲" class="table-wrapper" name="first1">
              <el-table :data="LikeSongData" height="350" class="songs" :header-cell-style="{
                background: 'transparent',
                height: '45px', border: 'none'
              }">
                <el-table-column prop="songName" label="歌曲" width="350px" />
                <el-table-column prop="artist" label="歌手" width="320px" />
                <el-table-column prop="album" label="专辑" width="300px" />
                <el-table-column label="操作" width="300px">
                  <template v-slot="scope">
                    <el-button :icon="Plus" class="delete" background='transparent' circle
                      @click="addSongTolistdialogVisible = true, addcurrentsongid = scope.row.songid" />
                  </template>
                </el-table-column>
              </el-table>

            </el-tab-pane>
            <el-tab-pane class="table-wrapper" label="歌单" name="third1">
              <el-table :data=LikeListsData height="350" class="songs" :header-cell-style="{
                background: 'transparent',
                height: '45px', border: 'none'
              }">
                <el-table-column prop="name" label="歌单名" width="400px" />
                <el-table-column prop="creatorname" label="创作者" width="250px" />
                <el-table-column prop="number" label="歌曲数目" width="250px" />
                <el-table-column label="操作" width="250px">
                  <template v-slot="scope">
                    <el-button :icon="Delete" class="delete" background='transparent' circle
                      @click="DeletedialogVisible = true, currentlistid = scope.row.id" />
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="我的歌单" name="second" class="table-wrapper">
          <el-table :data="CreateListsData" height="400px" class="songs" :header-cell-style="{
            background: 'transparent',
            height: '45px', border: 'none'
          }">
            <el-table-column prop="name" label="歌单名" width="300px" />
            <el-table-column prop="number" label="歌曲数目" width="250px" />
            <el-table-column prop="profile" label="歌曲简介" width="600px" />
            <el-table-column label="删除" width="250px">
              <template v-slot="scope">
                <el-button :icon="Delete" class="delete" background="transparent" circle
                  @click="DeleteCreatedialogVisible = true, currentlistid = scope.row.id, query()" />
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-table :data="CreateListsData1" height="450"  class="songs" :header-cell-style="{ background:'transparent',
                                    height:'45px',color:'#000000',border:'none'}">
                                        <el-table-column prop="name" label="歌单名" width="300px" />
                                        <el-table-column prop="number" label="歌曲数目" width="250px" />
                                        <el-table-column prop="profile" label="歌曲简介" width="600px" />
                                        <el-table-column label="删除" width="250px">
                                        <template v-slot="scope">
                                        <el-button :icon="Delete" class="delete" background="transparent" circle @click="DeleteCreatedialogVisible = true,currentlistid=scope.row.id,query()"/>
                                        </template>
                                        </el-table-column>        
                    </el-table> -->
        </el-tab-pane>
        <el-tab-pane label="音乐画像" name="third">
          <el-carousel :interval="4000" type="card" height="400px" class="userIn">
            <el-carousel-item class="userInfo1">
              <div class="user-info">
                <h1>基本资料</h1>
                <h2></h2>
                <p>性别: </p>
                <p>年龄: </p>
                <p>爱听音乐的男孩</p>
              </div>
            </el-carousel-item>
            <el-carousel-item class="userInfo2">
              <div class="user-info">
                <h1>听歌偏好</h1>
                <h2>City Pop</h2>
                <p>你的听歌曲风多元</p>
                <p>另类节奏布鲁斯</p>
                <p>也被品味独特的你收入囊中</p>
              </div>
            </el-carousel-item>
            <el-carousel-item class="userInfo3">
              <div class="user-info">
                <h1>听歌总数</h1>
                <h2>{{ "155首" }}</h2>
                <p>本月你的听歌数量比上月增加</p>

                <p>从音乐中获取满满能量</p>
              </div>
            </el-carousel-item>
            <el-carousel-item class="userInfo4">
              <div class="user-info">
                <h1>我的歌手榜</h1>
                <h2>Taylor Swift</h2>
                <p>太厉害了，又发现一个宝藏歌手</p>

              </div>
            </el-carousel-item>

          </el-carousel>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>

  <el-dialog v-model="DeletedialogVisible" title="是否要取消收藏该歌单" width="40%">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DeletedialogVisible = false">取消</el-button>
        <el-button type="primary" @click="DeletedialogVisible = false, deletelikeButton(), query()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="DeleteCreatedialogVisible" title="是否要删除该歌单" width="40%">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DeleteCreatedialogVisible = false">取消</el-button>
        <el-button type="primary" @click="DeleteCreatedialogVisible = false, deletecreateButton(), query()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="AdddialogVisible" title="创建歌单" width="30%">
    <span>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="歌单名">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formLabelAlign.profile" />
        </el-form-item>
      </el-form>
    </span>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="AdddialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addcreateButton(), AdddialogVisible = false, query()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addSongTolistdialogVisible" title="添加该歌曲到歌单" width="30%">
    <span>
      <el-form :label-position="labelPosition" label-width="100px" :model="CreateListsData" style="max-width: 460px">
        <el-form-item label="要添加的歌单">
          <el-select v-model="addcurrentlistid" clearable placeholder="请选择">
            <!-- <el-option 
                v-for= "item in CreateListsData"
                :key = "item.id"
                :label= "item.name"
                :value= "item.id"/> -->
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addSongTolistdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSongToList(), addSongTolistdialogVisible = false, query()">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style lang="less" scoped>
.person-box {
  display: flex;
  flex-direction: column;
}

.refresh {
  background-color: transparent;
  border: none;
  margin-left: 20px;
}

/*  */
.refresh i {
  color: #f2f2f2;
  font-size: 30px;
}

.delete {
  background-color: transparent;
  border: none;
}

.delete i {
  color: #f2f2f2;
  font-size: 22px;
}

.user2 {
  height: 120px;
  margin-top: 30px;
  line-height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .avatar2 {
    margin-left: 60px;
    border-radius: 50%;
  }

  .username2 {
    margin-left: 60px;
    font-size: 28px;
    color: #FFFFFF;
  }
}

.person-pages {
  width: 1300px;
  margin-top: 20px;
  margin-left: 60px;

}



.my-tabs>.el-tabs__item.is-active {
  color: #2E8CAC;

}

.my-tabs {
  ::v-deep .el-tabs__item {
    color: #fff;
    vertical-align: middle;
    margin-left: 70px;
  }

  .el-tabs__item.is-active {
    color: #2E8CAC;
  }

  .el-tabs__item:hover {
    color: #2E8CAC;
  }

  .el-tabs__active-bar {
    background-color: #2E8CAC;
    text-align: center;
    width: 90px !important;
    /* 不加important  不会生效，important会覆盖行内样式权限级别*/
    left: -1%;
    /* 根据实际情设置，尽量居中就行*/
  }
}

.el-carousel__item {
  text-align: center;
  vertical-align: middle;
  background-size: cover;

}

.userInfo1 {
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkYRMy3ifBgjxbF_p-NU1eyIpB8WZ_FQqB7YTV5SVPd8rCvVVI");

}

.userInfo2 {
  /* background-image: url("data:image/jpeg;base64,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"); */
  background-image: linear-gradient(to bottom right, #fff, #293047);

}

.userInfo3 {
  /* background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkiiSGuZZHAXgwIk9YzTjQjmMxxwne2-1VlQ&s"); */
  background-image: linear-gradient(to bottom, #fff, #6f60aa);

}

.userInfo4 {
  /* background-image: url("https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaa-jVlkLvuv3qQWfl5H2eJqLrKR7GczJNhBic7aWguGye5rLi"); */
  background-image: linear-gradient(to bottom left, #fff, #082E54);

}

.like-tabs {
  color: #FFFFFF;
  margin-top: 10px;

  .like-tabs>.el-tabs__item.is-active {
    color: #2E8CAC;

  }

  .el-tabs__item {
    color: #fff;
    font-size: 14px;
    vertical-align: middle;
    margin-left: 60px;
    margin-right: 60px;

  }

  .el-tabs__item.is-active {
    color: #2E8CAC;
  }

  .el-tabs__item:hover {
    color: #2E8CAC;
  }



  .el-tabs__nav-wrap::after {

    display: none;
  }

  .el-tabs__active-bar {
    display: none;
  }
}



.el-carousel {
  text-align: center;
}



h1 {
  font-size: 30px;
  color: #f2f2f2;
}

h2 {
  margin-top: 50px;
}

.user-info {
  height: 100%;
  text-align: center;
  padding: 20px;
  backdrop-filter: blur(10px);
  margin: auto;

}


.table-wrapper /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;

}

.table-wrapper /deep/ .el-table tr {
  background-color: transparent !important;
}

.table-wrapper /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;

}
</style>

<style>
.user-info {

  p,
  h1,
  h2 {
    color: #082E54;
  }

  h2 {
    font-style: italic;
  }
}
</style>
