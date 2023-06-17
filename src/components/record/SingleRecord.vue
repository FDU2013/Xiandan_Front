<template>
<div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button @click = "postDetail" link style="font-size: large;font-weight: bold;">{{postTitle}}</el-button>
        <el-button class="button" text v-if="status===1" style="color: red">撤销</el-button>
        <el-button class="button" text v-if="status===2" style="color: red" @click="applyAgain">再次申请</el-button>
        <div v-if="status===4">
          <el-button class="button" type="success" @click="agreeRecord">同意</el-button>
          <el-button class="button" type="danger" @click="refuseRecord">拒绝</el-button>
        </div>
      </div>
    </template>
    <div class="cardBody">
      <div class="message">
        {{applyMessage}}
      </div>

      <div class="time">
        {{applyTime}}
      </div>

    </div>
  </el-card>

  <div>
    <el-dialog :model-value="dialogFormVisible.visible" title="再次申请" append-to-body="true">
      <el-input v-model="apply.applyMessage" type="textarea" :rows="5" placeholder="在这里输入留言内容哦"></el-input>
      <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible.visible = false">取消</el-button>
            <el-button type="primary" @click="submitApply">
              提交申请
            </el-button>
          </span>
      </template>
    </el-dialog>
  </div>

</div>
</template>

<script>
import request from "@/request";
import router from "@/router";
import {reactive} from "vue";
import {ElMessage} from "element-plus";

export default {
  name: "SingleRecord",
  props:{
    apply:Object,
    //我给别人的：1 未处理 2 已拒绝 3已通过 别人给我的：4 未处理 5已拒绝 6已通过
    status:Number
  },
  emits:['refreshPending'],
  setup(props,{emit}){
    let applyInfo = props.apply;
    let status = props.status;
    let postID = applyInfo.postID;
    let postTitle = applyInfo.postTitle;
    let applyMessage = applyInfo.applyMessage;
    let applyTime = applyInfo.applyTime;
    let applyID = applyInfo.applyID;
    function postDetail(){
      request.post("/api/post/info",postID).then(res=>{
        let detail = res.data.data;
        router.push({
          path:'/postDetail',
          query:{
            id:detail.id,
            userID:detail.userID,
            title:detail.title,
            content:detail.content,
            price:detail.price,
            address:detail.address,
            goodsType:detail.goodsType,
            tags:detail.tags,
            postType:detail.postType,
            images:detail.images
          }
        })
      })
    }
    let dialogFormVisible = reactive({
      visible:false
    })
    function applyAgain(){
      dialogFormVisible.visible = true;
    }
    let apply = reactive({
      postID:postID,
      applyMessage:"",
    })
    function submitApply(){
      dialogFormVisible.visible = false;
      request.post("/api/user/applyRecord",apply).then(res=>{
        if(res.data.code === 200){
          ElMessage.success("留言成功！");
        }else{
          ElMessage.warning(res.data.msg);
        }
      })
    }
    function agreeRecord(){
      request.post("/api/user/agreeRecord",applyID).then(res=>{
        if(res.data.code === 200){
          ElMessage.success("已同意");
          emit("refreshPending");
        } else{
          ElMessage.warning(res.data.msg);
        }
      })
    }
    function refuseRecord(){
      request.post("/api/user/refuseRecord",applyID).then(res=>{
        if(res.data.code === 200){
          ElMessage.success("已拒绝");
          emit("refreshPending");
        } else{
          ElMessage.warning(res.data.msg);
        }
      })
    }
    return{postDetail,applyInfo,postTitle,applyMessage,status,applyTime,
      applyAgain,dialogFormVisible,submitApply,applyID,
    agreeRecord,refuseRecord}
  }
}
</script>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:20px;
}
.box-card {
  width: 80%;
  border-radius: 12px;
  margin:10px 0;
}
.cardBody{
  min-height: 50px;
  display: flex;
  flex-direction: column;
  .message{
  }
  .time{
    font-size: small;
    color: gainsboro;
    align-self: flex-end;
  }
}
</style>