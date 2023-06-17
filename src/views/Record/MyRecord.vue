<template>
  <mainContainer>
    <div class="select">
      <el-select v-model="optionValue.value" class="m-2" placeholder="Select" size="large" @change = "handleChange">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>

    <div v-if="status.value === 1" class="record">
      <SingleRecord v-for="item in records.pendingRecords"
                    :apply="item" :status="status.value"/>
    </div>
    <div v-if="status.value === 2" class="record">
      <SingleRecord v-for="item in records.rejectedRecords"
                    :apply="item" :status="status.value"/>
    </div>
    <div v-if="status.value === 3" class="record">
      <SingleRecord v-for="item in records.passedRecords"
                    :apply="item" :status="status.value"/>
    </div>
  </mainContainer>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import request from "@/request";
import SingleRecord from "@/components/record/SingleRecord";

export default {
  name: "MyRecord",
  components: {SingleRecord},
  setup(){
    function loadPending(){
      request.post("/api/user/waitingRecord").then(res=>{
        if(res.data.code === 200){
          records.pendingRecords = res.data.data;
        }else{
          ElMessage.error(res.data.msg);
        }
      })
    }
    function loadRejected(){
      request.post("/api/user/rejectedRecord").then(res=>{
        if(res.data.code === 200){
          records.rejectedRecords = res.data.data;
        }else{
          ElMessage.error(res.data.msg);
        }
      })
    }
    function loadPassed(){
      request.post("/api/user/passedRecord").then(res=>{
        if(res.data.code === 200){
          records.passedRecords = res.data.data;
        }else{
          ElMessage.error(res.data.msg);
        }
      })
    }
    onMounted(() => {
      loadPending();
      loadRejected();
      loadPassed();
    });
    let optionValue = reactive({
      value:"未通过申请"
    })
    let options = [
      {
        label:"未通过申请",
        value:"未通过申请"
      },
      {
        label:"已拒绝申请",
        value:"已拒绝申请"
      },
      {
        label:"已通过申请",
        value:"已通过申请"
      }
    ]
    let status = reactive({
      value: 1
    })
    let records = reactive({
      pendingRecords:[],
      rejectedRecords:[],
      passedRecords:[]
    })
    function handleChange(){
      if(optionValue.value === "未通过申请"){
        status.value = 1;
        loadPending();
      }else if(optionValue.value === "已拒绝申请"){
        status.value = 2;
        loadRejected();
      }else{
        status.value = 3;
        loadPassed();
      }
    }
    return{optionValue,options,handleChange,status,
    records,}
  }
}
</script>

<style scoped>
.select{
  margin:10px 0 10px 15%;
}
.record{
  margin:10px 0 10px 15%;
}
</style>