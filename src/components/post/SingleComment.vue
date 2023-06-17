<template>
<el-card class="box-card">
  <div class="main">

    <div class="left">
      <el-avatar :size="60" src="https://empty" @error="errorHandler">
        <img :src = "avatar"/>
      </el-avatar>
    </div>

    <div class="right">

     <div class="title">
       <div class="left">{{userID}}</div>
       <div class="right">信誉分：{{creditScore}}</div>
     </div>

      <div class="content">
        {{comment}}
      </div>

      <div class="time">
        {{commentTime}}
      </div>

    </div>

  </div>
</el-card>
</template>

<script>
export default {
  name: "SingleComment",
  props:{
    avatar:String,
    userID:String,
    creditScore:Number,
    commentTime:String,
    comment:String
  },
  setup(props){
    let avatar = props.avatar;
    let userID = props.userID;
    let creditScore = props.creditScore;
    let commentTime = props.commentTime;
    let comment = props.comment;
    const errorHandler = () => true
    return{avatar,userID,creditScore,commentTime,comment,errorHandler}
  }
}
</script>

<style scoped lang="less">
.box-card{
  border-radius: 25px;
  margin:5px 0;
  width: 90%;
}
.main{
  display: flex;
  flex-direction: row;
  height: 100%;
  .left{
    width: 10%;
    margin: 5px;
  }
  .right{
    width: 85%;
    margin: 5px;
    .title{
      height: 20%;
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      justify-content: flex-start;
      .left{
        align-self: center;
        color: rgb(64,158,255);
      }
      .right{
        font-size: small;
        color:gainsboro;
      }
    }
    .content{
      height: 60%;
      margin: 5px 0;
    }
    .time{
      height: 15%;
      font-size: small;
      color: gainsboro;
    }
  }
}
</style>