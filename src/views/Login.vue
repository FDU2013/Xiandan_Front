<template slot-scope="scope">
<!--    <div class="header">-->
<!--      <Header/>-->
<!--    </div>-->
  <mainContainer>
    <div class="main">
      <div class="login-main">
        <!--      输入账号和密码的地方-->
        <div class="login-input">
          <div class="login" @keyup.enter="login">
            <div style="margin: 0 0 10px 0;text-align: center;font-size: large;font-weight: bold;color:rgb(85,158,255)">
              登录
            </div>
            <el-form :model="login_data" size="normal" :rules="rules">
              <el-form-item>
                <el-input prefix-icon = "User" v-model="login_data.userID" />
              </el-form-item>
              <el-form-item>
                <el-input show-password prefix-icon="Lock" v-model="login_data.password"/>
              </el-form-item>
              <el-button style="width: 100%;" type="primary" @click="login">
                登录
              </el-button>
              <div style="font-size: 5px;margin-top: 5px;float: right;cursor: pointer" @click = "register">
                还没有账号？立即注册
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </mainContainer>

</template>

<script>
import {getCurrentInstance, reactive} from "vue";
import router from "@/router";
import request from "@/request";
import {ElMessage} from "element-plus";

export default {
  name: "Login",
  setup(){
    let rules ={
      number: [
        { required: true, message: '请输入账号', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }
    function login(){
      request.post("/api/auth/login",login_data).then(res => {
          if(res.data.code === 200){
            ElMessage.success(res.data.msg);
            sessionStorage.setItem("user", JSON.stringify(res.data.data));
            router.push("/postList");
          }else{
            ElMessage.error(res.data.msg);
          }
      })
    }
    function register(){
      router.push("/register");
    }
    //登录数据
    let login_data = reactive({
      userID:"",
      password:""
    })
    return{rules,login,register,login_data}
  }
}
</script>

<style scoped>
body{
  width: 100%;
  height: 100%;
}
.main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
}
.header{
  height: 10%;
}
.login-main{
  width: 100%;
  height:88%;
  display: flex;
}
.login-input{
  background: white;
  margin:10% 0 0 60%;
  width: 30%;
  height: 60%;
  border-radius: 12px;
  display: flex;
}
.login {
  width: 60%;
  height:60%;
  float:right;
  margin: auto 20%;
}
.footer{
  height: 5%;
  margin: 10px auto;
  font-size: small;
}
</style>