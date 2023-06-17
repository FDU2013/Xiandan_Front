<template>
<el-menu
    :default-active="activeIndex"
    router
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
>
    <el-menu-item index="main" class="main">闲旦</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="postList">所有帖子</el-menu-item>
    <el-menu-item index="evaluation">我的评价</el-menu-item>
    <el-menu-item index="addPost">我的帖子</el-menu-item>
    <el-sub-menu index="1">
      <template #title>记录</template>
      <el-menu-item index="myRecord">我的记录</el-menu-item>
      <el-menu-item index = "notDealRecord">待处理申请</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <el-menu-item v-if="!flag" index="login">登录</el-menu-item>
      <el-menu-item v-if="!flag" index="register">注册</el-menu-item>
      <el-menu-item v-if="flag" index="post">个人主页</el-menu-item>
      <el-menu-item v-if="flag" @click="logout">注销登录</el-menu-item>
    </el-sub-menu>
</el-menu>
</template>

<script>
import { ref } from 'vue'
import router from "@/router";
export default {
    data(){
        return{
            flag:'',
        }
    },
    mounted(){
        this.$data.flag = (sessionStorage.getItem('user'))?true:false
    },
    computed: {
        activeIndex() {
            return this.$route.name;
        },
    },
    methods:{
        handleSelect(index) {
            this.$router.push({
                name: index,
            });
        },
      logout(){
        sessionStorage.removeItem("user");
        router.push("/login");
      }
    }

}
</script>

<style>
.flex-grow {
flex-grow: 1;
}
.el-menu-demo{
    height: 60px;
}
.main{
  font-weight: bold;
  font-size: 20px;
}
</style>
  