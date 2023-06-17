<template>
    <div>
        <el-container class="common-layout">
            <el-header class="set-padding">
                <layoutHeader />
            </el-header>
            <el-main v-bind:style="{minHeight: Height+'px'}" class="set-padding">
                <slot />
            </el-main>
            <el-footer class="set-padding">
                <layoutFooter />
            </el-footer>
        </el-container>
    </div>
</template>
  
<script>
import layoutHeader from "../header/index.vue";
import layoutFooter from "../footer/index.vue";
export default {
    components: {
        layoutHeader,
        layoutFooter,
    },
    data() {
     return {
       Height: 0
     }
    },
    mounted(){
        //动态设置内容高度 让footer始终居底   header+footer的高度是100
        this.Height = document.documentElement.clientHeight - 100;  
    　　//监听浏览器窗口变化　
        window.onresize = ()=> {this.Height = document.documentElement.clientHeight -100}
    }
};
</script>
<style scoped>
.set-padding{
    padding: 0px;
}
.common-layout{
    background-image:url("../../assets/loginBackground.jpg");
    background-size: 100% 100%;
    overflow: hidden;
}
.el-footer {
    --el-footer-height: 40px!important;
}
</style>