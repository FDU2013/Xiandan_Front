<template>
  <mainContainer>
    <div class="main">
      <div class="title">
        所有帖子
      </div>

      <div class="filters">

        <el-select v-model="pageInfo.goodsType" placeholder="请选择商品类型">
          <el-option
              v-for="item in goodsTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="pageInfo.postType" placeholder="请选择帖子类型">
          <el-option
              v-for="item in postTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="pageInfo.address" placeholder="请选择所在校区">
          <el-option
              v-for="item in addressOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>

      </div>

      <div class="tags">
        <el-form :inline="true" :model = newTag class="demo-form-inline">
          <el-form-item label="请添加标签">
            <el-input v-model="newTag.tag" placeholder="请添加标签"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addTags">添加</el-button>
          </el-form-item>
        </el-form>

        <el-checkbox-group v-model="pageInfo.tags">
          <el-checkbox
              v-for = "item in tagOptions.tags"
              :key="item.value"
              :label="item.label"
              :value = "item.value">
          </el-checkbox>
        </el-checkbox-group>

      </div>

      <div class="search">
        <el-input clearable v-model="pageInfo.search" placeholder="请输入关键字" style="width:50%;margin-left: 100px"></el-input>
        <el-button type="primary" style="margin:5px 0" @click="load">搜索</el-button>
        <el-button type="primary" class="newPost" @click = "newPost">发布帖子</el-button>
      </div>

      <div class="list">
        <div v-for="item in postArray.records" :key="item.id">
          <SinglePost :parent="'search'" :detail="item"/>
        </div>
      </div>

      <div style="margin: 10px auto">
        <el-pagination
            v-model:currentPage="pageInfo.pageNum"
            v-model:page-size="pageInfo.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="postArray.total"
            @current-change="handleCurrentChange"
        />
      </div>

    </div>
  </mainContainer>
</template>

<script>
import {onMounted, reactive} from "vue";
import request from "@/request";
import router from "@/router";
import {ElMessage} from "element-plus";
import SinglePost from "@/components/post/SinglePost";

export default {
  name: "PostList",
  components: {SinglePost},
  setup(){
    function load(){
      request.post("/api/post/searchForOpenPost",pageInfo).then(res=>{
        if(res.data.code === 200){
          postArray.total = res.data.total;
          postArray.records = res.data.data.records;
        }else{
          ElMessage.error(res.data.msg);
        }
      })
    }
    onMounted(()=>{
      load()
    })
    function handleCurrentChange(pageNum){
      pageInfo.pageNum = pageNum;
      load()
    }
    let pageInfo = reactive({
      tags:[],
      pageNum:1,
      pageSize:10,
      search:"",
      priceMin:0,
      priceMax:-1,
      goodsType:"",
      postType:"",
      address:""
    });
    let goodsTypeOptions = [
      {
        value:'学习用品',
        label:'学习用品'
      },
      {
        value:'生活用品',
        label:'生活用品'
      },
      {
        value: '娱乐',
        label: '娱乐'
      },
      {
        value:'其他',
        label: '其他'
      }
    ]
    let postTypeOptions = [
      {
        value:'出售',
        label:'出售'
      },
      {
        value:'购买',
        label:'购买'
      }
    ]
    let addressOptions = [
      {
        value:'邯郸校区',
        label:'邯郸校区'
      },
      {
        value:'江湾校区',
        label:'江湾校区'
      },
      {
        value:'枫林校区',
        label:'枫林校区'
      },
      {
        value:'张江校区',
        label:'张江校区'
      },
      {
        value:'校外',
        label:'校外'
      },
      {
        value:'外省',
        label:'外省'
      },
    ];

    let tagOptions = reactive({
      tags:[]
    })
    let checkedTags = reactive({
      tags:[]
    })
    let newTag = reactive({
      tag:""
    });
    function addTags(){
      let temp = {
        value:newTag.tag,
        label:newTag.tag
      }
      if(tagOptions.tags.length == 5){
        ElMessage.error("最多只能添加五个标签哦");
      }else if(tagOptions.tags.findIndex(obj=>obj.value == newTag.tag) !== -1){
        ElMessage.error("不可以有重复的标签哦")
      }else{
        tagOptions.tags.push(temp);
        newTag.tag = "";
      }

    }
    //数组响应式 https://blog.csdn.net/qq_43750656/article/details/113987010
    let postArray = reactive({
      total:0,
      records:[
      ]
    })
    function newPost(){
      router.push("/addPost");
    }
    return{load,
      pageInfo,postArray,
      goodsTypeOptions,postTypeOptions,addressOptions,
      tagOptions,checkedTags,addTags,newTag,
      handleCurrentChange,
      newPost}
  }
}
</script>

<style scoped lang="less">
.main{
  display: flex;
  flex-direction: column;
  margin: 0 10%;
  width: 60%;
  .title{
    width: 100%;
    font-size: 40px;
    font-weight: bold;
    margin: 5px 0;
  }
  .filters{
    margin:5px auto;
    width: 100%;
  }
  .tags{
    margin: 5px auto;
    width: 100%;
    .el-form{
      display: inline !important;
    }
    .el-checkbox-group{
      display: inline !important;
    }
  }
  .search{
    width:150%;
    margin: 0 0 0 -5%;
  }
  .list{
  }
}
</style>