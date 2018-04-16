<template>
    <div class="put-box">
        <el-input v-model="title" style="margin-bottom: 30px" placeholder="文章标题"></el-input>
        <el-input v-model="intro" style="margin-bottom: 30px" placeholder="文章简介"></el-input>
        <div class="editorContainer">
            <markdown 
            :mdValuesP="msg.mdValue"  
            :fullPageStatusP="false" 
            :editStatusP="true" 
            :previewStatusP="true" 
            :navStatusP="true"
            :icoStatusP="true"  
            @childevent="childEventHandler"
            v-if="showMD"
                ></markdown>
        </div>
        <el-button @click="publish()" class="fl">发表</el-button>
        <el-input v-model="tag" class="fr" placeholder="标签" style="width:200px"></el-input>
    </div>
    
</template>
<script>
import markdown from './markdown'
import plus from '../public.js';
import axios from 'axios';
export default {
  data() {
        return {
            msg: {
                mdValue:'',
                htmlValue:''
            },
            title:'',
            intro:'',
            id:'',
            tag:'',
            showMD:false
        }
    },
    components: {
        markdown
    },
    activated(){
        if(this.$route.query.id){
            this.id = this.$route.query.id
            this.getInfo()
        }else{
            this.msg.mdValue = ''
            this.msg.htmlValue = ''
            this.title = ''
            this.intro = ''
            this.id = ''
            this.tag = ''
            this.showMD = true
        }
    },
    methods:{
        childEventHandler(res){
            // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg = res;
        },
        getInfo(){
            axios.get(plus.path + '/api/learn/info', {
                params: {
                    id: this.$route.query.id
                }
            }).then(res => {
                if (res.data.status == '0000') {
                    //_this.item = res.data.data;
                    this.intro = res.data.data.intro;
                    this.title = res.data.data.title;
                    // this.msg.htmlValue = res.data.data.html;
                    this.msg.mdValue = res.data.data.md;
                    this.tag = res.data.data.tag;
                    this.showMD = true
                }
            })
        },
        publish(){
            if(this.id){
                this.update()
            }else{
                this.send()
            }
        },
        update(){
            axios.post(plus.path + '/api/learn/update', {
                title: this.title,
                html: this.msg.htmlValue,
                md:this.msg.mdValue,
                id: this.$route.query.id,
                intro: this.intro,
                tag: this.tag,
                token: window.localStorage.getItem('token')
            }).then(res => {
                if (res.data.status == '0000') {
                    this.$message('更新成功');
                }
            })
        },
        send(){
            axios.post(plus.path + '/api/learn/add', {
                title: this.title,
                html: this.msg.htmlValue,
                md:this.msg.mdValue,
                intro: this.intro,
                tag: this.tag,
                token: window.localStorage.getItem('token')
            }).then(res => {
                if (res.data.status == '0000') {
                    this.$message('添加成功');
                    // this.$router.push({path: '/home/learnlist'})
                }
            })
        }
    }
}
</script>
<style>
.editorContainer {
    height: 450px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
}
.put-box {
    padding: 50px;
  }
</style>
