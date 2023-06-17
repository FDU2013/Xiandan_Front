<template>
    <mainContainer>
        <div id="regispage">
            <div id="welcome">请输入您的注册信息</div>
            <el-form
                ref="ruleFormRef"
                :model="registerRuleForm"
                status-icon
                :rules="registerRules"
                label-width="120px"
                class="registerForm"
            >
                <el-form-item label="复旦uis学号：" prop="uis">
                    <el-input v-model="registerRuleForm.uis" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="复旦uis密码：" prop="uisPasswd">
                    <el-input v-model="registerRuleForm.uisPasswd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：" prop="userID">
                    <el-input v-model="registerRuleForm.userID" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：" prop="password">
                    <el-input v-model="registerRuleForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="确&nbsp;&nbsp;认&nbsp;&nbsp;密&nbsp;&nbsp;码：" prop="passwordcheck">
                    <el-input v-model="registerRuleForm.passwordcheck" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：" prop="name">
                    <el-input v-model="registerRuleForm.name" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：" prop="email">
                    <el-input v-model="registerRuleForm.email" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：" prop="phone">
                    <el-input v-model="registerRuleForm.phone" type="text" autocomplete="off" />
                </el-form-item>
                <div id="buttons">
                    <el-button type="primary" @click="submitFormPreCheck">注&nbsp;&nbsp;&nbsp;册</el-button>
                    <el-button @click="this.$router.push({
                        name: 'login',
                    })">已有账号？</el-button>
                </div>
            </el-form>
        </div>
    </mainContainer>
</template>

<script>
import qs from 'qs'
import request from '../request/index'
import router from "@/router";
export default {
  components:{},
  mounted(){
      this.getUIS()
  },
  data(){
    let recheckpw =(rule,value,callback)=>{
        if (value===""){
            callback(new Error('请再次确认密码'));
            return false;
        }
        else {
            if(this.$data.registerRuleForm.password!=value){
                callback(new Error('两次输入密码不一致'));
                return false;
            }
            else {
                callback();
                return true;
            }
        }
    };
    let uisIDCheck =(rule,value,callback)=>{
        const pat0=/^[0-9]{11}$/;
        if (value===""){
            callback(new Error('请输入复旦uis学号'));
            return false;
        }
        else {
            if(!pat0.test(value)){
                callback(new Error('uis学号格式不正确'));
                return false;
            }
            else {
                callback();
                return true;
            }
        }
    };
    return{
        registerRuleForm:{
            uis:'',
            uisPasswd:'',
            userID:'',
            password:'',
            passwordcheck:'',
            email:'',
            phone:'',
            name:'',
        },
        registerRules :({
            uis: [
                {required: true, validator: uisIDCheck, trigger: 'blur' },
            ],
            uisPasswd:[
                {required: true, message: '请输入复旦uis密码', trigger: 'blur',},
            ],
            userID:[
                {required: true, message: '请设置闲旦用户ID', trigger: 'blur',},
            ],
            name:[
                {required: true, message: '请设置闲旦用户昵称', trigger: 'blur',},
            ],
            password:[
                {required: true, message: '请设置闲旦用户密码', trigger: 'blur',},
            ],
            passwordcheck:[
                {required: true, validator: recheckpw, trigger: 'blur',},
            ],
            email:[
                {required: true, message: '请设置个人邮箱', trigger: 'blur',},
            ],
            phone:[
                {required: true, message: '请输入电话号码', trigger: 'blur',},
            ],
        }),
        uisWebPage:'',
        validInput:[],
        Data:{
            username :'',
            password :'', 
            lt :'',
            dllt :'',
            execution :'',
            _eventId :'',
            rmShown :'',
        },
        Jsessionid:'',
    };
  },
  methods:{
      getUIS(){
          request.get("/uis/authserver/login?service=https%3A%2F%2Felearning.fudan.edu.cn%2Flogin%2Fcas").then(res =>{
              this.$data.uisWebPage=res.data;
              this.anaylizeUis();
          }).catch(err =>{
              console.log(err);
          })
      },
      anaylizeUis(){
          let pattForJsessionid = /<(link)[^>]*(jsessionid=)[^>]*>/gi;
          console.log(this.$data.uisWebPage)
          let tempAction=this.$data.uisWebPage.match(pattForJsessionid);
          this.$data.Jsessionid=tempAction[0].split("fudan.css;jsessionid=")[1].split("\"")[0]
          if(this.$data.Jsessionid==null||this.$data.Jsessionid==''||this.$data.Jsessionid.length==0){
              document.cookie=localStorage.getItem("uisJesissionid");
          }
          else{
              document.cookie='JSESSIONID='+this.$data.Jsessionid
              localStorage.setItem("uisJesissionid",'JSESSIONID='+this.$data.Jsessionid);
          }
          let pattForInput = /<(input)[^>]*name=[^>]*>/gi;
          this.$data.validInput=this.$data.uisWebPage.match(pattForInput);
          for(let item in this.$data.validInput){
              let tempData = {name:'',value:''};
              tempData.name=this.$data.validInput[item].split("name=\"")[1].split("\"")[0]
              tempData.value=this.$data.validInput[item].split("value=\"")[1].split("\"")[0]
              switch(tempData.name){
                  case 'username' :
                      this.$data.Data.username=tempData.value;
                      break;
                  case 'password' :
                      this.$data.Data.password=tempData.value;
                      break;
                  case 'lt' :
                      this.$data.Data.lt=tempData.value;
                      break;
                  case 'dllt' :
                      this.$data.Data.dllt=tempData.value;
                      break;
                  case 'execution' :
                      this.$data.Data.execution=tempData.value;
                      break;
                  case '_eventId' :
                      this.$data.Data._eventId=tempData.value;
                      break;
                  case 'rmShown' :
                      this.$data.Data.rmShown=tempData.value;
                      break;
              }
          }
      },
      verifyUIS(){
        this.$data.Data.username=this.$data.registerRuleForm.uis
        this.$data.Data.password=this.$data.registerRuleForm.uisPasswd
        let dataNew2 = qs.stringify(this.$data.Data)
        let _this=this;
        fetch("/uis/authserver/login?service=https%3A%2F%2Felearning.fudan.edu.cn%2Flogin%2Fcas", {
            method: 'post',
            body: dataNew2,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: 'manual'
        }).then(function(response) {
            return response
        }).then(function(response) {
            if(response.status==500){
                alert("网络出错啦！请关闭浏览器或删除cookie后重试")
            }
            else if(response.status==200){
                alert("复旦uis账号或密码错误！")
            }
            else if(response.status==0&&response.type=='opaqueredirect'){
                _this.submitForm();
            }
        })
      },
      submitFormPreCheck(){
        this.$refs['ruleFormRef'].validate((valid) => {
            if (valid) { 
                this.verifyUIS()
            }
            else{
                return false
            }
        })
      },
      submitForm(){
        let formdata = {
            "stuNum":this.$data.registerRuleForm.uis,
            "userID":this.$data.registerRuleForm.userID,
            "password":this.$data.registerRuleForm.password,
            "name":this.$data.registerRuleForm.name,
            "email":this.$data.registerRuleForm.email,
            "phone":this.$data.registerRuleForm.phone
        }
        let _this=this
        request.post("/api/auth/register",formdata).then(res=>{
            if(res.data.code=="200"){
                alert("注册成功！")
                router.push("/login");
            }else{
                alert(res.data.msg)
            }
        })
      }
  }
}
</script>


<style scoped>
#regispage{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}
.registerForm{
    border-radius: 10px;
    padding: 30px;
    border: 1px  #dedfe0 solid;
    margin-top: 30px;
    width: 45%;
}
#buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
#submit{
  border: 1px black;
  cursor: pointer;
}
#UIS{
  display: none;
}
#welcome{
    margin-top: 20px;
    font-size: 20px;
    font-weight: 300;
}
</style>
