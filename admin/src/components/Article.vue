<template>
  <div class="put-box">
    <el-input v-model="title" style="margin-bottom: 30px" placeholder="文章标题"></el-input>
    <el-input v-model="intro" style="margin-bottom: 30px" placeholder="文章简介"></el-input>
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  style="height: 400px">
    </quill-editor>
    <div class="publish-btn">
      <el-button @click="publish()" class="fl">发表</el-button>
      <el-select v-model="tagId" placeholder="请选择" class="fr">
        <el-option
          v-for="(item,index) in tagList"
          :key="index"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>
    </div>

  </div>
</template>
<style>
  .put-box {
    padding: 50px;
  }

  .publish-btn {
    margin-top: 30px;
  }
  .ql-container{
    height: 310px;
  }
</style>
<script>
  import plus from '../public.js';
  import axios from 'axios';
  import {quillEditor} from 'vue-quill-editor';
  export default{
    components: {
      quillEditor
    },
    data(){
      return {
        title: '',
        content: '',
        intro: '',
        tagList:[],
        tagId:''
      }
    },
    mounted(){
    	this.getTag()
    },
    methods: {
      publish(){
        if (!this.title) {
          return;
        }
        if (!this.intro) {
          return;
        }
        if (!this.content) {
          return;
        }
        if (!this.tagId) {
          return;
        }
        var _this = this;
        axios.post(plus.path + '/api/article/add', {
          title: _this.title,
          content: _this.content,
          intro: _this.intro,
          tagId: _this.tagId,
          token: window.localStorage.getItem('token')
        }).then(function (res) {
          if (res.data.status == '0000') {
            _this.$message('发表成功');
            _this.$router.push({path: '/home/articlelist'})
          }
        })
      },
      getTag(){
      	var _this = this;
      	axios.get(plus.path + '/api/article/tag')
          .then(function (res) {
            if (res.data.status == '0000') {
             _this.tagList = res.data.data;
            }
        })
      }
    }
  }
</script>
