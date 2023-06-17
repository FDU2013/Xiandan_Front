<template>
  <div class="title">
    评论区
  </div>

  <div class="newComment">
    <el-input
        v-model="newComment.comment"
        :rows="3"
        type="textarea"
        placeholder="发条友善的评论见证当下"
        class="input"
    />
    <el-button type="primary" class="button" @click="sendComment">
      发表评论
    </el-button>
  </div>

  <div class="allComments">
    <SingleComment v-for="item in allComments.comments"
    :avatar="item.avatar" :userID="item.userID" :creditScore="item.creditScore" :comment="item.comment" :commentTime="item.commentTime"/>
  </div>

  <div style="margin: 10px auto">
    <el-pagination
        style="justify-content: center"
        v-model:currentPage="pageInfo.pageNum"
        v-model:page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import request from "@/request";
import {onMounted, reactive} from "vue";
import {ElMessage} from "element-plus";
import SingleComment from "@/components/post/SingleComment";

export default {
  name: "PostComment",
  components: {SingleComment},
  props:{
    postID:Number
  },
  setup(props){
    let newComment = reactive({
      postID:props.postID,
      comment:""
    })
    let pageInfo = reactive({
      postID:props.postID,
      pageSize:10,
      pageNum:1
    })
    function load(){
      request.post("/api/post/getComment",pageInfo).then(res=>{
        if(res.data.code === 200){
          allComments.comments = res.data.data.records;
          total = res.data.data.total;
        }else{
          ElMessage.error("获取评论区失败！");
        }
      })
    }

    let total = 0;

    function handleCurrentChange(pageNum){
      pageInfo.pageNum = pageNum;
      load()
    }

    onMounted(() => {
      load();
    });

    function sendComment(){
      if(newComment.comment === ""){
        ElMessage.error("不可以发送空评论哦");
      }else{
        request.post("/api/user/uploadComment",newComment).then(res=>{
          if(res.data.code === 200){
            ElMessage.success("发表成功！");
            newComment.comment = "";
            load();
          }
          else{
            ElMessage.error("发表失败！");
          }
        })
      }
    }
    let allComments = reactive({
      comments:[
      ]
    })
    return{newComment,sendComment,allComments,pageInfo,handleCurrentChange,total}
  }
}
</script>

<style scoped lang="less">
.title{
  margin: 5px;
}
.newComment{
  display: flex;
  flex-direction: row;
  .input{
    width: 85%;
    margin: 5px;
  }
  .button{
    width: 10%;
    margin: 5px;
  }
}
</style>