<template>
  <mainContainer>
    <div id="post-body">
      <div id="post-main">
        <div id="identity" class="shuxiang">
          <div id="name-photo">
            <div class="name-photo1">
              <div id="photo">
                <img class="touxiang" :src="info.avatar" />
              </div>
            </div>
            <div class="name-photo1">
                <h2 id="uername">{{info.userID}}</h2>
            </div>
            <div id="name-photo-des" class="name-photo1">
              <div class="name-photo2"  >
                <h4 id="fatie">{{info.totalPosts}}</h4>
                <div class="name-photo2-des">累计发帖</div>
              </div>
              <div class="name-photo2"  >
                <h4 id="maichu">{{info.totalTrades}}</h4>
                <div class="name-photo2-des">累计交易</div>
              </div>
              <div class="name-photo2"  >
                <h4 id="credit">{{info.creditScore}}</h4>
                <div class="name-photo2-des">信誉评分</div>
              </div>
            </div>
          </div>
          <div class="hhhwuyebuzhi">
            <div id="personalinform">
              <div class="name-photo3">
                <h4>您的个人信息如下：</h4>
                <el-icon @click="dialogopen()" class="openupdate" :style="iconStyle">
                  <Edit />
                </el-icon>
              </div>
  
              <el-descriptions
                class="margin-top"
                :column="1"
                border
              >
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <user />
                      </el-icon>
                      用户名
                    </div>
                  </template>
                  {{info.userID}}
                </el-descriptions-item >
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <iphone />
                      </el-icon>
                      电话
                    </div>
                  </template>
                  {{info.phone}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <Discount />
                      </el-icon>
                      学号
                    </div>
                  </template>
                  {{info.stuNum}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <tickets />
                      </el-icon>
                      姓名
                    </div>
                  </template>
                  {{info.name}}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      <el-icon :style="iconStyle">
                        <MessageBox />
                      </el-icon>
                     邮箱
                    </div>
                  </template>
                  {{info.email}}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div id="pingjia">
              <h4 id="pingjialo">您收到了如下评价：</h4>
              <div class="sssssss" v-if="comments.length!=0">
                <div class="sssssss" v-for="item in comments">
                  <el-descriptions
                    class="margin-top"
                    :column="3"
                    :size="small"
                    border
                  >
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon :style="iconStyle">
                            <user />
                          </el-icon>
                          用户
                        </div>
                      </template>
                      <div class="dstouxiang">
                        <img class="touxiang22" :src="info.avatar" />
                        {{item.userID}}
                      </div>
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon :style="iconStyle">
                            <Notification />
                          </el-icon>
                          帖子
                        </div>
                      </template>
                      <el-button size="small" @click="tiaozhuan(item.postID)" type="primary" plain>跳转</el-button>
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon :style="iconStyle">
                            <Star />
                          </el-icon>
                          评价
                        </div>
                      </template>
                     {{ item.evaluation }}
                    </el-descriptions-item>
                    <el-descriptions-item 
                    :span="3">
                      <template #label>
                        <div class="cell-item">
                          <el-icon :style="iconStyle">
                            <ChatLineRound />
                          </el-icon>
                          标题
                        </div>
                      </template>
                      {{ item.postTitle }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div class="cell-item">
                          <el-icon :style="iconStyle">
                            <ChatLineRound />
                          </el-icon>
                          内容
                        </div>
                      </template>
                      {{ item.evaluation }}
                    </el-descriptions-item>
                  </el-descriptions>
                </div>
              </div>
              <div class="sssssss" v-else>
                暂无评价
              </div>
              
            </div>
          </div>
          
        </div>
  
        <el-dialog
          v-model="centerDialogVisible"
          title="请修改您的信息"
          width="30%"
          align-center
        >
          <el-form
            :label-position="labelPosition"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 460px"
          >
            <el-upload
              v-model:file-list="fileList"
              :auto-upload="true"
              class="upload-demo"
              list-type="picture"
              :show-file-list="false"
              :http-request="handleFileUpload"
              :limit="1"
              accept="image/jpeg,image/png"
            >
              <template #trigger>
                <img class="touxiang" :src="updateForm.avatar" />
              </template>

            </el-upload>
            <el-form-item label="姓名">
              <el-input v-model="updateForm.name" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="updateForm.phone" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="updateForm.email" />
            </el-form-item>
          </el-form>
          <el-button @click="modifyinf()" type="primary">确认修改</el-button>
        </el-dialog>
      </div>
    </div>
</mainContainer>
</template>

<script>
import router from "@/router";
import axios from "axios"
import request from "@/request";
import SinglePost from "@/components/post/SinglePost";
export default {
  name: "Post",
  components: {SinglePost},
  data(){
    return{
      imgsrc:"",
      centerDialogVisible:false,
      value:1,
      options222:[{label:"开放中的帖子",value:1},{label:"已关闭帖子",value:2}],
      postlist:[],
      counter:0,
      fileList:[],
      inputVisible: false,
      inputValue: '',
      options3:[{label:"邯郸",value:"邯郸"},{label:"江湾",value:"江湾"},{label:"枫林",value:"枫林"},{label:"张江",value:"张江"},{label:"校外",value:"校外"},{label:"外省",value:"外省"}],
      options:[{label:"出售",value:"出售"},{label:"购买",value:"购买"}],
      options2:[{label:"学习用品",value:"学习用品"},{label:"生活用品",value:"生活用品"},{label:"娱乐",value:"娱乐"},{label:"其他",value:"其他"}],
      form:{
          "tags": [], //null或者size为0都认为是不考虑tag，但是必须有这个字段,搜索时，只要帖子有tags中任意一个tag就认为是符合要求的，会被搜出来
          "pageNum": 1,
          "pageSize": 10,
          "search": "", //关键字，会在标题中搜索，要不要在内容中一并搜索还在考虑
          "priceMin" : 0, //表示搜索的价格区间的最小值，要求非负
          "priceMax" : -1,//表示搜索的价格区间的最大值，-1表示不设置上限
          "goodsType" : "",
          "postType" : "",
          "address" : ""
      },
      comments:[
          // {
          //     "evaluationID":2,
          //     "userID":"111",//留下评价的对方的ID
          //     "avatar":"",//对方的头像
          //     "postID":2,//对应的帖子ID
          //     "postTitle":"出xx",
          //     "evaluation" : "好评",//这里只有两个选择["好评","差评"]
          //     "content" : "卖家很nice"//文字描述
          // },
      ],
      updateForm:{
        "avatar":"",
        "phone": "",
        "name": "",
        "email": ""
      },
      info:{},
    };
  },
  mounted(){
    this.getinform();
    this.getcomment();
  },
  methods:{
    getcomment(){
      let that=this;
      let uID = JSON.parse(sessionStorage.getItem("user")).userID;
      let para={
          "userID" : uID,
          "recentSize" : 4, //查看最近的4条他人对这个用户的评论
      }
      request.post("/api/user/getRecentEvaluationByOthers",para).then(res=>{
          that.$data.comments=res.data.data;
          for(item in that.$data.comments){
              if(item.avatar==null||item.avatar==""){
                  item.avatar = require("../assets/icon.jpg")
              }
              else{
                  item.avatar = require(item.avatar)
              }
          }
      }).catch(err=>{
          console.log(err)
      })
      
    },
    tiaozhuan(postID){
      let detail;
      request.post("/api/post/info",postID).then(res=>{
        detail=res.data.data
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
      }).catch(err=>{
        console.log(err)
        alert("网络错误，请重试！")
        return;
      })
    },
    modifyinf(){
      let _this=this
        request.post("/api/user/updateInfo",_this.$data.updateForm).then(res=>{
            if(res.data.code=="200"){
                alert("修改成功！")
                this.getinform();
            }else{
                alert("修改失败，请重试！")
            }
        }).catch(err=>{
          console.log(err)
          alert("修改失败，请重试！")
        }).finally(()=>{
          this.$data.centerDialogVisible = false
        })
    },
    handleFileUpload(){
      const config = {
        headers:{
          'Authorization': 'GNm1SVYurwIdCNTcQ7qHkYvyLn42ZEDw',
          'Content-Type': 'multipart/form-data'
        }
      };
      let formdata = new FormData()
      formdata.append("smfile",this.$data.fileList[0].raw)
      formdata.append("format","json")
      let that=this;
      axios.post("/img/upload", formdata ,config).then(res=>{
        if(res.data.code=="success"){
          that.$data.updateForm.avatar = res.data.data.url
        }else if(res.data.code=='image_repeated'){
          that.$data.updateForm.avatar = res.data.images
        }
        else{
          alert(res.data.message)
        }
      }).catch(err=>{
        console.log(err)
        return false;
      })
    },
    dialogopen(){
      this.$data.updateForm.avatar=this.$data.info.avatar;
      this.$data.updateForm.phone=this.$data.info.phone;
      this.$data.updateForm.name=this.$data.info.name;
      this.$data.updateForm.email=this.$data.info.email;
      this.$data.centerDialogVisible = true
    },
    getMsg(data){
      if(data=='fresh'){
        this.getpersonpost(this.$data.value==1?"showOpenPost":"showClosePost")
      }
    },
    changeTarget(){
      if(this.$data.value==1){
          this.getpersonpost("showOpenPost")
      }else if(this.$data.value==2){
          this.getpersonpost("showClosePost")
      }
    },
    getinform(){
      let that=this
      request.post("/api/user/info").then(res=>{
        that.$data.info=res.data.data
        if(res.data.data.avatar==null||res.data.data.avatar==""){
          that.$data.info.avatar = require("../assets/icon.jpg")
        }
        else{
          that.$data.info.avatar = require(res.data.data.avatar)
        }
        // that.getcomment(that.$data.info.userID);
        }).catch(err=>{
          console.log(err)
        })
    },
    handleClose(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    async handToSMMS(i){
      const config = {
        headers:{
          'Authorization': 'GNm1SVYurwIdCNTcQ7qHkYvyLn42ZEDw',
          'Content-Type': 'multipart/form-data'
        }
      };
      let formdata = new FormData()
      formdata.append("smfile",this.$data.fileList[i].raw)
      formdata.append("format","json")
      let that=this;
      await axios.post("/img/upload", formdata ,config).then(res=>{
        if(res.data.code=="success"){
          that.$data.form.images_url.push(res.data.data.url)
          return true;
        }else if(res.data.code=='image_repeated'){
          that.$data.form.images_url.push(res.data.images)
          return true;
        }
        else{
          alert(res.data.message)
          return false;
        }
      }).catch(err=>{
        console.log(err)
        return false;
      })
    },
    onSubmit(){
      if(this.$data.form.title==''||this.$data.form.content==''||this.$data.form.price==''||
      this.$data.form.goodsType==''||this.$data.form.address==''||this.$data.form.postType==''){
        alert("请完善必填信息后再发帖！")
        return false
      }
      if(this.$data.form.tags.length==0){
        alert("请输入tag后再发帖！")
        return false
      }
      for(let i=0;i<this.$data.fileList.length;i++){
        let typenow=this.$data.fileList[i].raw.type.toLowerCase();
        if(typenow!='image/png'&&typenow!='image/jpg'&&typenow!='image/jpeg'){
          alert("只能上传png或jpg格式的图片！")
          return false
        }
      }
      this.addPost()
    },
    addPost(){
      let arr = []
      let that=this;
      for(let i=0;i<that.$data.fileList.length;i++){
        let p = new Promise(function(resolve, reject) {
          that.handToSMMS(i).then(res=>{
            if(res==false){
              reject("img_err")
            }
            else{
              resolve("success")
            }
            }).catch(err=>{
              reject("img_err")
          })
        })
        arr.push(p)
      }
      Promise.all(arr).then(res=>{
        request.post("/api/user/addPost", that.$data.form).then(res=>{
            alert("上传成功！")
            that.$router.push({
                name: 'postList',
            });
          }).catch(err=>{
            if(err=="img_err"){
              that.$data.form.images_url=[]
              alert("图片上传失败！请重试！")
            }
            else{
              that.$data.form.images_url=[]
              alert("发布出现错误！请重试")
            }
          })
      })
    },
  }
}
</script>

<style scoped>
.testsinglepost{
  margin-bottom: 10px;
}
#shuxiang2a{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 15px;
}
#post-body{
  width: 100%;
  height: 100%;
}
#post-main{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
#post-main{
  min-height: 100%;
}
.shuxiang2{
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
}
.shuxiang{
  margin-top: 10px;
  min-height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
#identity{
  width: 70%;
  min-height: 100%;
}
.name-photo3{
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 10px;
}
#posts{
  margin-left: 10px;
  margin-right: 10px;
  width:  42%;
}
#postarea{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row-item{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
}
.row-item2{
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
}
.shuxiang21{
  margin-top: 5px;
}
.shuxiang22{
  width: 48%;
}
#name-photo{
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: white;
}
.name-photo1{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
#photo{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#updatetouxiang{
  cursor: pointer;
}
.touxiang{
  border: 2px solid  #73767a;
  margin-top: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
#uername{
  margin-top: 10px;
}
.name-photo1{
  text-align: center;
}
.name-photo2-des{
  margin-top: 5px;
  font-size: 10px;
  color: #73767a;
}
#name-photo-des{
  margin-top: 20px;
}
#personalinform{
  margin-top: 20px;
  padding: 10px;
  width: 43%;
  border-radius: 5px;
  background-color: white;
}
#pingjia{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  width: 52%;
  border-radius: 5px;
  background-color: white;
}
#pingjialo{
  width: 100%;
  margin-bottom:10px;
  margin-top:10px;
}
.hhhwuyebuzhi{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.sssssss{
  width: 100%;
}
.tagsss{
  margin-top: 10px;
}
.itemtag{
  margin-right: 15px;
}
.inputtag{
  max-width: 88px;
}
.openupdate{
  cursor: pointer;
}
.dstouxiang{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.touxiang22{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>