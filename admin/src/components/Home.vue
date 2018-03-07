<template>
    <div>
        <el-col :span="4">
            <el-menu default-active="1" class="el-menu-vertical-demo" :style="{height: height+'px'}" theme="dark">
                <!--<el-menu-item index="1" @click="go('hostinfo')">个人信息</el-menu-item>-->
                <!--<el-menu-item index="2" @click="go('userlist')">用户列表</el-menu-item>-->
                <el-menu-item index="1" @click="go('articlelist')">文章列表</el-menu-item>
                <el-menu-item index="2" @click="go('album')">相册</el-menu-item>
                <!--<el-menu-item index="4" @click="go('question')">问答区</el-menu-item>-->
                <!--<el-menu-item index="5" @click="go('message')">留言板</el-menu-item>-->
                <!--<el-menu-item index="6" @click="go('impression')">好友印象</el-menu-item>-->
            </el-menu>
        </el-col>
        <div class="el-col-20">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                height:''
            }
        },
        mounted(){
            this.height = document.documentElement.clientHeight;
        },
        methods:{
            go(url){
                this.$router.push({name:url})
            }
        }
    }
</script>
<style>

</style>
