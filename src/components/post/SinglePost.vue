<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span @click = "postDetail" style="cursor: pointer">{{ detail.title }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click = "postDetail">查看详情</el-button>
      <el-popconfirm v-if="this.$props.parent=='open'" @confirm="closePost(detail.id)" title="你确认要关闭帖子吗？">
        <template #reference>
          <el-button style="float: right; padding: 3px 0;margin-right:20px" type="danger" text>关闭帖子</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm v-else-if="this.$props.parent=='close'" @confirm="openPost(detail.id)" title="你确认要开放帖子吗？">
        <template #reference>
          <el-button style="float: right; padding: 3px 0;margin-right:20px" type="success" text>开放帖子</el-button>
        </template>
      </el-popconfirm>
    </div>
    <div class="text item">

      <el-tag
          size="large"
          :type = "successTag"
          v-if="isSell"
          style="margin: 0 2px"
      >
        {{detail.postType}}
      </el-tag>

      <el-tag
          size="large"
          :type = "dangerTag"
          v-if="!isSell"
          style="margin: 0 2px"
      >
        {{detail.postType}}
      </el-tag>

      <el-tag
          v-for="item in detail.tags"
          :key="item"
          :type='defaultTag'
          effect="plain"
        style="margin: 0 2px">
        {{ item }}
      </el-tag>

    </div>
  </el-card>
</template>

<script>
import router from "@/router";
import request from "@/request";
import {ElMessage} from "element-plus";
export default {
  props: {
    detail:Object,
    parent:String,
  },
  name: "SinglePost",
  setup(props,context){
    let detail = props.detail;
    function postDetail(){
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
    }
    function closePost(id) {
      const that=context
      let p = new Promise(function(resolve,reject){
        request.post("/api/user/closePost",id).then(res=>{
        if(res.data.code==200){
          resolve("success")
        }
        else{
          reject("fail")
        }
      }).catch(err=>{
        reject("fail")
      })
    })
    p.then(res=>{
      ElMessage.success("帖子关闭成功！");
      that.emit('receive','fresh')
    }).catch(err=>{
      ElMessage.error("关闭失败，请重试！");
    })
    }
    function openPost(id) {
      const that=context
      let p = new Promise(function(resolve,reject){
        request.post("/api/user/openPost",id).then(res=>{
        if(res.data.code==200){
          resolve("success")
        }
        else{
          reject("fail")
        }
      }).catch(err=>{
        reject("fail")
      })
    })
    p.then(res=>{
      ElMessage.success("帖子开放成功！");
      that.emit('receive','fresh')
    }).catch(err=>{
      ElMessage.error("开放失败，请重试！");
    })
    }
    let defaultTag = '';
    let successTag = 'success';
    let dangerTag = 'danger';
    let isSell = detail.postType === "出售";
    return{postDetail,detail,parent,closePost,openPost,
    defaultTag,successTag,dangerTag,isSell}
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.clearfix{
  font-weight: bold;
  font-size: large;
}
.box-card {
  height: 90px;
  width: 90%;
  margin: 5px auto;
}
</style>