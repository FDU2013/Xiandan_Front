<template>
    <mainContainer>
      <div id="post-body">
        <div id="post-main">
          <div id="eva" class="shuxiang">
            <div class="select">
                <el-select v-model="opvalue" class="m-2" size="large" @change = "opvalue==1?2:1">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
            </div>
            <div class="control" v-if="opvalue==1">
                <div class="sssssss" v-if="evaluations.length!=0">
                    <div class="sssssss" v-for="item in evaluations">
                      <el-descriptions
                        class="margin-top"
                        :column="4"
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
                            <img class="touxiang22" :src="item.avatar" />
                            {{item.userID}}
                          </div>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                              <div class="cell-item">
                                <el-icon :style="iconStyle">
                                  <ChatLineRound />
                                </el-icon>
                                帖子标题
                              </div>
                            </template>
                            {{ item.postTitle }}
                          </el-descriptions-item>
                        <el-descriptions-item>
                          <template #label>
                            <div class="cell-item">
                              <el-icon :style="iconStyle">
                                <Notification />
                              </el-icon>
                              帖子详情
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
                              操作
                            </div>
                          </template>
                          <el-button size="small" @click="toevaluate(item.evaluationID)" type="success" plain>去评价</el-button>
                        </el-descriptions-item>
                      </el-descriptions>
                    </div>
                  </div>
                  <div class="sssssss1" v-else>
                    暂无需要进行的评价
                  </div>
            </div>
            <div class="control"  v-if="opvalue==2">
                <div class="sssssss" v-if="evaluations2.length!=0">
                    <div class="sssssss" v-for="item in evaluations2">
                      <el-descriptions
                        class="margin-top"
                        :column="4"
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
                            <img class="touxiang22" :src="item.avatar" />
                            {{item.userID}}
                          </div>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                              <div class="cell-item">
                                <el-icon :style="iconStyle">
                                  <ChatLineRound />
                                </el-icon>
                                帖子标题
                              </div>
                            </template>
                            {{ item.postTitle }}
                          </el-descriptions-item>
                        <el-descriptions-item>
                          <template #label>
                            <div class="cell-item">
                              <el-icon :style="iconStyle">
                                <Notification />
                              </el-icon>
                              帖子详情
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
                              您的评价
                            </div>
                          </template>
                          <el-tag class="ml-2" v-if="item.evaluation=='好评'"  type="success">好评</el-tag>
                          <el-tag class="ml-2" v-if="item.evaluation=='差评'"  type="warning">差评</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                              <div class="cell-item">
                                <el-icon :style="iconStyle">
                                  <Star />
                                </el-icon>
                                评价内容
                              </div>
                            </template>
                            {{ item.content }}
                          </el-descriptions-item>
                      </el-descriptions>
                    </div>
                  </div>
                  <div class="sssssss1" v-else>
                    暂无完成的评价
                  </div>
            </div>

         
            
          </div>
        </div>
        <el-dialog
            v-model="centerDialogVisible"
            title="请填写评价"
            width="30%"
            align-center
        >
            <div id="modifydia">
                <el-select v-model="evaform.evaluation" placeholder="请选择评价" class="m-2" size="large" @change = "handleChange">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
                <el-input
                    class="m-2"
                    v-model="evaform.content"
                    :rows="2"
                    type="textarea"
                    placeholder="请输入评价内容"
                />
                <div class="m-2 m-22">
                    <el-button @click="centerDialogVisible=flase" type="danger">取消</el-button>
                    <el-button @click="confirmtoeval()" type="primary">确认</el-button>
                </div>
                
            </div>
        </el-dialog>
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
        centerDialogVisible:false,
        evaluations:[
            {
                // "evaluationID":3,
                // "userID":"111",//留下评价的对方的ID
                // "avatar":require("../assets/icon.jpg"),//对方的头像
                // "postID":2,//对应的帖子ID
                // "postTitle":"出xx",
            },
        ],
        evaluations2:[
        //     {
        //     "evaluationID":2,
        //     "userID":"2334",//由你来评价的对方的ID
        //     "avatar":require("../assets/icon.jpg"),//对方的头像
        //     "postID":2,//对应的帖子ID
    	// 	"postTitle":"出xx",
        //     "evaluation" : "好评",//这里只有两个选择["好评","差评"]
    	// 	"content" : "卖家很nice"//文字描述
        // },
        // {
        //     "evaluationID":2,
        //     "userID":"2334",//由你来评价的对方的ID
        //     "avatar":require("../assets/icon.jpg"),//对方的头像
        //     "postID":2,//对应的帖子ID
    	// 	"postTitle":"出xx",
        //     "evaluation" : "差评",//这里只有两个选择["好评","差评"]
    	// 	"content" : "卖家很nice"//文字描述
        // },
        ],
        opvalue:1,
        options:[
            {
                label:"待填写评价",
                value:1
            },
            {
                label:"已填写评价",
                value:2
            },
        ],
        options2:[
            {
                label:"好评",
                value:"好评",
            },
            {
                label:"差评",
                value:"差评",
            },
        ],
        evaform:{
            "evaluationID" : "",
            "evaluation" : "",//这里只有两个选择["好评","差评"]
            "content" : ""//文字描述
        }
      };
    },
    mounted(){
        this.getToeva()
        this.getaleva()
    },
    methods:{
        toevaluate(ID){
            this.evaform.evaluationID=ID;
            this.evaform.content="";
            this.evaform.evaluation="";
            this.centerDialogVisible=true;
        },
        getToeva(){
            let that=this;
            request.post("/api/user/toDealEvaluationList").then(res=>{
                let temp=res.data.data;
                for(let i in temp){
                   let item=temp[i]
                    if(item.avatar==null||item.avatar==""){
                        item.avatar = require("../assets/icon.jpg")
                    }
                }
                that.$data.evaluations=temp
            }).catch(err=>{
                console.log(err)
            })
        },
        getaleva(){
            let that=this;
            request.post("/api/user/DealedEvaluationList").then(res=>{
                let temp=res.data.data;
                for(let i in temp){
                   let item = temp[i]
                    if(item.avatar==null||item.avatar==""){
                        item.avatar = require("../assets/icon.jpg")
                    }
                }
                that.$data.evaluations2=temp
            }).catch(err=>{
                console.log(err)
            })
        },
        confirmtoeval(){
            let that=this;
            request.post("/api/user/writeEvaluation",this.$data.evaform).then(res=>{
                if(res.data.code==200){
                    alert("评价成功！")
                    that.centerDialogVisible=false
                    that.getToeva()
                    that.getaleva()
                }else{
                    alert("评价失败！")
                }
            }).catch(err=>{
                console.log(err)
                alert("评价失败！")
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
    }
  }
  </script>
  
  <style scoped>
  #modifydia{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

  }
  .margin-top{
    width: 95%;
  }
  .sssssss{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .sssssss1{
    width: 90%;
  }
  .touxiang22{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  #eva{
    padding: 10px;
    width: 80%;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
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
  .select{
    width: 90%;
    margin-bottom: 15px;
  }
  .control{
    width: 100%;
  }
  .dstouxiang{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .m-2{
    width:80%;
    margin-bottom: 10px;
  }
  .m-22{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
  </style>