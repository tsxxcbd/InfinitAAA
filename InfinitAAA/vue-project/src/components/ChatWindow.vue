<script>
import {Plus} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElForm, ElButton, ElInput, ElRow, ElCol } from 'element-plus';
import { langchaincaht } from '../api/langchain.js'
export default {
  components: {
    ElForm,
    ElButton,
    ElInput,
    ElRow,
    ElCol,
  },
  data() {
    return {
      inputText: '',
      messages: [
        { id: 1, text: '你好', isMe: false },
        { id: 2, text: 'Hi', isMe: true },
      ],
      resSongId: '',
      ans: {},
      id: ''
    };
  }, methods: {
    sendDataToParent() {
      this.$emit('childData', this.resSongId);
    },
    async handleSend() {
      // 发送消息
      if (this.inputText.trim()) {
        this.messages.push({ id: Date.now(), text: this.inputText, isMe: true });
      }

      // 发送请求并获取回复
      console.log(this.inputText);
      try {
        const response = await langchaincaht(this.inputText);
        console.log(response);

        // 解析 JSON 字符串
        const responseData = JSON.parse(response);
        // 获取 ans 字段的值
        const answerText = responseData.ans;
        this.resSongId = responseData.id;
        this.addcurrentsongid = responseData.id;
        console.log(answerText);

        // 将回答添加到 messages 数组中
        if (answerText.trim()) {
          this.messages.push({
            id: Date.now(),
            text: answerText,
            isMe: false,
          });
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }

      // 清空输入框
      this.inputText = '';
    },
  },
  setup() {

    const addSongTolistdialogVisible = ref(false);
    const addcurrentsongid = ref('');
    const addcurrentlistid = ref('');
    const CreateListsData = ref([
      {
        "id": 6,
        "name": '敲代码专用'
      }, {
        "id": 10,
        "name": '快乐'
      }, {
        "id": 11,
        "name": '学习专用'
      }
    ]);

    const User = ref({ "id": 10 });
    const addSongToList = () => {
      try {

        console.log(addcurrentsongid.value);
        console.log(this.id);
        //addSongIntoList(addcurrentsongid.value,addcurrentlistid.value);
        //query();



      } catch (e) {
        //alert("获取数据失败"+e.message)
      }
    }

    return {
      addSongToList,
      addSongTolistdialogVisible,
      addcurrentsongid,
      addcurrentlistid,
      CreateListsData,
      User,
    }

  },


};
</script>
<template>
  <div class="chat-window">
    <!-- 显示聊天消息的容器 -->
    <div class="message-container">
      <div v-for="message in messages" :key="message.id" class="message">
        <div v-if="message.isMe" class="message-text mine">
          {{ message.text }}</div>
        <div v-else class="message-text chat">
          {{ message.text }}</div>
      </div>
    </div>
    <!-- 输入消息的表单 -->
    <el-form @submit.prevent.native="sendMessage" class="input-form">
      <el-row :gutter="30" align="middle" class="form-row">
        <el-col :span="14">
          <el-input v-model="inputText" placeholder="输入消息" class="inputText"></el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="handleSend">发送</el-button>
          <el-button @click="sendDataToParent, addSongTolistdialogVisible = true" type="primary" round
            class="addToCurrent">+</el-button>
        </el-col>
        <!-- <el-col :span="6"> -->
        <!-- <el-button type="primary" @click="langchainchat">对话</el-button> -->
        <!-- </el-col> -->
      </el-row>
    </el-form>
  </div>
  <el-dialog v-model="addSongTolistdialogVisible" title="添加该歌曲到歌单" width="30%" class="addToList">
    <span>
      <el-form :label-position="labelPosition" label-width="100px" :model="CreateListsData" style="max-width: 460px">
        <el-form-item label="要添加的歌单">
          <el-select v-model="addcurrentlistid" clearable placeholder="请选择">
            <el-option v-for="item in CreateListsData" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addSongTolistdialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addSongToList">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>



<style scoped>
.addToCurrent {
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 30px;
}

.chat-window {
  backdrop-filter: blur(10px);
  max-width: 430px;
  margin: 0 auto;
  height: 550px;
  /* 固定高度为500px */
  max-height: 500px;
  /* 设置最大高度为500px */
  overflow-y: auto;
  /* 当内容超出高度时显示纵向滚动条 */
  position: relative;

}

.message-container {
  margin-bottom: 10px;
}

.message {
  padding: 5px;
  margin-bottom: 5px;

}

.message-text {
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #121a2a
}

.mine {
  background-color: #fff;
}

.input-form {
  position: absolute;
  bottom: 20px;
  /* 距离底部50px */
  left: 45px;
}


.inputText {
  font-size: 16px;
}


.chat {
  position: relative;
}
</style>

<style>
.addToList {
  top: 70px;
  background-color: #000;
  font-size: 20px;
}
</style>