<template>
  <div class="tag">
    <div class="tag-item" v-for="(item,index) in tagList" :key="index" :style="{backgroundColor:item.color}" @click="clickTag(item.id)">{{item.title}}</div>
    <div class="tag-item" style="background-color:#ccc" @click="showAdd = true">添加</div>

    <el-dialog title="添加文章标签" :visible.sync="showAdd">
      <el-input v-model="title" placeholder="标签名字" class="tag-input"></el-input>
      <el-input v-model="color" placeholder="标签颜色" class="tag-input"></el-input>
      <el-button type="primary" @click="addTag()">确定</el-button>
    </el-dialog>
  </div>
</template>
<style scoped>
.tag{
  padding: 50px;
}
.tag-item{
  float: left;
  padding: 0 20px;
  height: 40px;
  border-radius: 8px;
  color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tag-input{
  margin-bottom: 5px;
}
</style>
<script>
import plus from '../public.js';
import axios from 'axios';
export default {
  data(){
    return{
      tagList:[],
      showAdd:false,
      color:'',
      title:''
    }
  },
  mounted(){
    this.getTag()
  },
  methods:{
    getTag(){
      	var _this = this;
      	axios.get(plus.path + '/api/article/tag')
          .then(function (res) {
            if (res.data.status == '0000') {
             _this.tagList = res.data.data;
            }
        })
      },
    addTag(){
      if(!this.title){
        this.$message('请输入文章标签名');
        return
      }
      if(!this.color){
        this.$message('请输入文章标签颜色');
        return
      }
      axios.post(plus.path + '/api/article/tag',{
        title:this.title,
        color:this.color,
      }).then(res => {
        if (res.data.status == '0000') {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.title = ''
            this.color = ''
            this.showAdd = false
            this.getTag()
        }
      })
    },
    clickTag(id){
      this.$alert('确认删除该标签', '删除', {
          confirmButtonText: '确定',
          callback: action => {
            this.deleteTag(id)
          }
        });
    },
    deleteTag(id){
      axios.post(plus.path + '/api/article/tag/delete',{
        id:id,
        token:window.localStorage.getItem('token')
      }).then(res => {
        this.getTag()
      })
    }
  }
}
</script>
