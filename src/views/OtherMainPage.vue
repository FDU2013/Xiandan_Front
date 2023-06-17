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
                  <h4>ta的个人信息如下：</h4>
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
                <h4 id="pingjialo">ta收到了如下评价：</h4>
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
        </div>
      </div>
  </mainContainer>
  </template>
  
  <script>
  import request from "@/request";
  import SinglePost from "@/components/post/SinglePost";
  export default {
    name: "Post",
    components: {SinglePost},
    data(){
      return{
        imgsrc:"",
        userID:'',
        value:1,
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
        info:{},
      };
    },
    mounted(){
      this.getinform();
      this.getcomment()
    },
    methods:{
      getcomment(){
        let that=this;
        let para={
            "userID" : this.$route.query.userID,
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
      getinform(){
        let that=this
        request.post("/api/user/otherUserInfo",that.$route.query.userID).then(res=>{
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