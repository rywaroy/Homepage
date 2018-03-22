<template>
  <div class="base">
    <el-input v-model="word" style="margin-bottom: 30px" placeholder="博客首页文字"></el-input>
    <el-button @click="publish()">确认</el-button>
  </div>
</template>
<style>
.base{
    padding: 100px;
}
</style>
<script>
import axios from 'axios';
import plus from '../public.js';
export default {
  data(){
      return{
          word:''
      }
  },
  mounted(){
      this.getContent()
  },
  methods:{
      publish(){
          axios.post(plus.path + '/api/base/content',{
              word:this.word,
              token: window.localStorage.getItem('token')
          }).then(res => {
                if (res.data.status == '0000') {
                    this.$message('修改成功')
                }
            })
      },
      getContent(){
          axios.get(plus.path + '/api/base/content')
            .then(res => {
                if (res.data.status == '0000') {
                    this.word = res.data.data.word
                }
            })
      }
  }
}
</script>
