<template>
  <mainContainer>
    <div id="post-body">
      <div id="post-main">
        <div id="identity" class="shuxiang">
          <div id="name-photo">
            <div class="name-photo1">
              <div id="photo">
                <img id="touxiang" :src="info.avatar" />
              </div>
            </div>
            <div class="name-photo1">
                <h2 id="uername">{{info.userID}}</h2>
            </div>
            <div id="name-photo-des" class="name-photo1">
              <div class="name-photo2"  >
                <h4 id="fatie">{{info.totalPosts}}</h4>
                <div class="name-photo2-des">累计交易</div>
              </div>
              <div class="name-photo2"  >
                <h4 id="maichu">{{info.totalTrades}}</h4>
                <div class="name-photo2-des">累计售出</div>
              </div>
              <div class="name-photo2"  >
                <h4 id="credit">{{info.creditScore}}</h4>
                <div class="name-photo2-des">信誉评分</div>
              </div>
            </div>
          </div>
          <div id="personalinform">
            <div class="name-photo3">
              <h4>当季热门活动：</h4>
            </div>
            <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in this.$data.carouseData" :key="item">
                <img class="sss" :src="item.url"/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div id="posts" class="shuxiang">
         <div id="postarea" class="shuxiang2">
           <el-input class="shuxiang21" id="title-form" placeholder="#标题" v-model="form.title" type="text" />
           <el-input class="shuxiang21" placeholder="#详细内容" v-model="form.content" type="textarea" />
           <div class="shuxiang21 row-item">
             <el-select class="shuxiang22" v-model="form.address" placeholder="#收货地址">
               <el-option
                 v-for="item in options3"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
               />
             </el-select>
             <el-input class="shuxiang22" placeholder="#价格" v-model="form.price" type="number" />
           </div>
           <div class="shuxiang21 row-item">
             <el-select class="shuxiang22" v-model="form.postType" placeholder="#发帖类型">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
               />
             </el-select>
             <el-select class="shuxiang22" v-model="form.goodsType" placeholder="#商品类型">
               <el-option
                 v-for="item in options2"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value"
               />
             </el-select>
           </div>

           <div class="tagsss">
             <el-tag
               v-for="tag in form.tags"
               :key="tag"
               class="mx-1 itemtag"
               closable
               :disable-transitions="false"
               @close="handleClose(tag)"
             >
               {{ tag }}
             </el-tag>
             <el-input
               v-if="inputVisible"
               ref="InputRef"
               v-model="inputValue"
               class="ml-1 w-20 inputtag"
               size="small"
               @keyup.enter="handleInputConfirm"
               @blur="handleInputConfirm"
             />
             <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
               +添加tag
             </el-button>
           </div>
           <div class="shuxiang21 row-item2">
           <el-upload
             v-model:file-list="fileList"
             :auto-upload="false"
             class="upload-demo"
             list-type="picture"
             multiple
             :limit="3"
             accept="image/jpeg,image/png"
           >
           <template #trigger>
             <el-icon id="uploadpic" :size="25">
               <Picture />
             </el-icon>
           </template>

           </el-upload>
             <el-button  type="primary" @click="onSubmit">发帖</el-button>
           </div>
         </div>
          <div class="shuxiang2">
            <div id="shuxiang2a">
              <h3>选择帖子类型:&nbsp;&nbsp;&nbsp;&nbsp;</h3>
              <el-select
              @change="changeTarget"
                v-model="value" class="m-2" placeholder="Select"
              >
                <el-option
                  v-for="item in options222"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div v-if="postlist!=null">
              <div v-for="item in postlist" :key="item.id">
                <SinglePost @receive="getMsg" class="testsinglepost"  :parent="value==1?'open':'close'"  :detail="item"/>
              </div>
            </div>
            <div v-else id="msgs">还没有符合的帖子哦</div>
          </div>
        </div>
  
      </div>
    </div>
</mainContainer>
</template>

<script>
import axios from "axios"
import request from "@/request";
import SinglePost from "@/components/post/SinglePost";
import router from "@/router";
export default {
  name: "Post",
  components: {SinglePost},
  data(){
    return{
      imgsrc:'',
      carouseData: [
        { url: require("../../assets/c1.jpg") },
        { url: require("../../assets/c2.jpg") },
        { url: require("../../assets/c3.jpg") },
        // { url: require("../../assets/c4.png") },
      ],
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
          "address" : "",
          "images_url" : [],
      },
      info:{},
    };
  },
  mounted(){
    this.getinform();
    this.getpersonpost("showOpenPost");
  },
  methods:{
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
    getpersonpost(target){
      let that =this
      request.post("/api/user/"+target,this.$data.form).then(res=>{
        that.$data.postlist=res.data.data.records
        }).catch(err=>{
          console.log(err)
        })
    },
    getinform(){
      let that=this
      request.post("/api/user/info").then(res=>{
        that.$data.info=res.data.data
        if(res.data.data.avatar==null||res.data.data.avatar==""){
          that.$data.info.avatar = require("../../assets/icon.jpg")
        }
        else{
          that.$data.info.avatar = require(res.data.data.avatar)
        }
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
            router.push("/postList");
            that.getpersonpost()
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

.sss{
  width:100%;
  height: 100%;
  object-fit: cover;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
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
  width: 22%;
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
#touxiang{
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
  width: 100%;
  border-radius: 5px;
  background-color: white;
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
</style>