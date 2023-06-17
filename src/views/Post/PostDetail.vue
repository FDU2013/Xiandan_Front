<template>
  <mainContainer>

    <div class="main">

      <div class="title">
        <span style="font-size: 4em;font-weight: bold">{{postInfo.title}}</span>
        <span @click="toInformPage(postInfo.userID)" style="font-size: 1em;color:gray;cursor:pointer;">用户名：{{postInfo.userID}}</span>
      </div>

      <div class="body">
        <div class="swiper">

          <van-swipe :autoplay="3000" touchable>
            <van-swipe-item v-for="image in postInfo.images" :key="image">
              <img :src="image" />
            </van-swipe-item>
          </van-swipe>

        </div>

        <div class="content">
          <el-card class="box-card" style="border-radius: 12px;text-align: center;height: 100%">

            <div style="margin: 5px 10%;">
              <div style="font-size: large;font-weight: bold;margin: 5px 0">商品描述</div>
              {{postInfo.content}}
            </div>

            <div style="margin: 5px 0;font-weight: bold">
              位置:{{postInfo.address}}
            </div>
            <div style="margin: 5px 0;font-weight: bold">
              商品类型:{{postInfo.goodsType}}
            </div>

            <div style="margin: 5px 0">
              <el-tag
                v-for="item in postInfo.tags"
                :key="item"
                :type='defaultTag'
                effect="plain">
              {{ item }}
            </el-tag>
            </div>

            <div style="margin: 5px 0">
              <el-tag
                  size="large"
                  :type = 'successTag'
                  v-if="isSell"
              >
                {{postInfo.postType}}
              </el-tag>

              <el-tag
                  size="large"
                  :type = 'dangerTag'
                  v-if="!isSell"
              >
                {{postInfo.postType}}
              </el-tag>
            </div>

            <div style="font-size: 150%;font-weight: bold;margin-top: 10px">
              价格:￥{{postInfo.price}}
            </div>

            <div>
              <el-button type="primary" size="large" class="buyButton" @click="applyRecord">
                我想要
              </el-button>
            </div>
          </el-card>
        </div>
      </div>

      <div class="comment">
        <PostComment :postID ="postInfo.id"/>
      </div>
    </div>

    <div>
      <el-dialog :model-value="dialogFormVisible.visible" title="给楼主留言" append-to-body="true">
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

  </mainContainer>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import { useRouter } from "vue-router";
import request from "@/request";
import {ElMessage} from "element-plus";
import PostComment from "@/components/post/PostComment";

export default {
  name: "PostDetail",
  components: {PostComment},
  setup(){
    const router = useRouter();
    let postInfo = reactive({
      id:router.currentRoute.value.query.id,
      userID:router.currentRoute.value.query.userID,
      title:router.currentRoute.value.query.title,
      content:router.currentRoute.value.query.content,
      price:router.currentRoute.value.query.price,
      address:router.currentRoute.value.query.address,
      goodsType:router.currentRoute.value.query.goodsType,
      tags:router.currentRoute.value.query.tags,
      postType:router.currentRoute.value.query.postType,
      images:router.currentRoute.value.query.images
    });
    let defaultTag = ''
    let successTag = 'success'
    let dangerTag = 'danger'
    let isSell = (postInfo.postType === "出售");
    let allComments = reactive({
      comments:[
      ]
    })
    let dialogFormVisible = reactive({
      visible:false
    })
    function applyRecord(){
      dialogFormVisible.visible = true;
    }
    function toInformPage(userIDtemp){
      let localuser = JSON.parse(sessionStorage.getItem("user"));
      console.log(localuser.userID)
      if(userIDtemp==localuser.userID){
        router.push({path:'/post'})
      }
      else{
        router.push({path:'/othersInform',query: {userID:postInfo.userID}})
      }
      
    }
    let apply = reactive({
      postID:postInfo.id,
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
    return{
      postInfo,
      defaultTag,successTag,dangerTag,isSell,
      allComments,
      dialogFormVisible,
      applyRecord,
      apply,
      submitApply,
      toInformPage,
    }
  }
}
</script>

<style scoped lang="less">
.main{
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  .title{
    margin:10px 0;
  }
  .body{
    display: flex;
    justify-content: center;
    .swiper{
      width:30%;
      height: 100%;
      .van-swipe{
        width: 100%;
        height: 300px;
        .van-swipe-item{
          padding: 0 10px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
    .content{
      width: 45%;
      margin:0 10px;
      .box-card{
        display: flex;
        flex-direction: column;
      }
    }
  }
  .comment{
    margin:10px 0;
  }
  .buyButton{
    font-weight: bold;
    font-size: medium;
    width: 15%!important;
    height: 40px;
    border-radius: 12px;
  }
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>