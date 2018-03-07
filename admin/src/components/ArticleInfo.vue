<template>
    <div class="article-box">
        <el-input v-model="title" placeholder="请输入内容" class="mb20"></el-input>
        <el-input v-model="intro" style="margin-bottom: 30px" placeholder="文章简介"></el-input>
        <quill-editor ref="myTextEditor" v-model="content" style="height: 400px">
        </quill-editor>
        <el-select v-model="tagId" placeholder="请选择" class="fr">
            <el-option v-for="(item,index) in tagList" :key="index" :label="item.title" :value="item.id">
            </el-option>
        </el-select>
        <div class="publish-btn">
            <el-button @click="update">更新</el-button>
        </div>
        <!-- <div class="comment-box">
                <ul>
                    <li class="comment" v-for="(list,index) in comment" :key="index">
                        <div>{{list.nickname}}:{{list.commentContent}}   <a href="javascript:;" @click="delc(index)">删除评论</a></div>
                        <img :src="list.image" alt="" v-if="list.image"/>
                        <ul>
                            <li class="reply" v-for="(reply,indexs) in list.child" :key="indexs">{{reply.user}} <span v-if="reply.re_user">回复{{reply.re_user}}</span>:{{reply.content}}  <a href="javascript:;" @click="delr(indexs,index)">删除回复</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="limit"
                    @current-change="handleCurrentChange">
            </el-pagination> -->
    </div>
</template>
<style>
.article-box {
    padding: 50px;
}

.mb20 {
    margin-bottom: 20px;
}

.reply {
    margin-left: 30px;
}

.comment {
    padding: 10px;
}

.ql-container {
    height: 310px;
}
</style>
<script>
import plus from '../public.js';
import axios from 'axios';
import { quillEditor } from 'vue-quill-editor';
export default {
    data() {
        return {
            title: '',
            content: '',
            comment: [],
            intro:'',
            page: 1,
            total: null,
            limit: 5,
            tagList:[],
            tagId:''
        }
    },
    activated() {
        this.getinfo();
        this.getTag();
        //            this.getcomment();
    },
    methods: {
        getinfo() {
            var _this = this;
            axios.get(plus.path + '/api/article/info', {
                params: {
                    id: _this.$route.query.id
                }
            }).then(function(res) {
                if (res.data.status == '0000') {
                    //_this.item = res.data.data;
                    _this.intro = res.data.data.intro;
                    _this.title = res.data.data.title;
                    _this.content = res.data.data.content;
                    _this.tagId = res.data.data.tagid;
                }
            })
        },
        getcomment() {
            var _this = this;
            axios.get(plus.path + '/article/comment', {
                params: {
                    id: _this.$route.query.id,
                    page: _this.page,
                    limit: _this.limit
                }
            }).then(function(res) {
                if (res.data.state == 1) {
                    _this.comment = res.data.data.list;
                    _this.total = res.data.data.total;
                } else {
                    if (res.data.state == '401') {
                        _this.$router.push({ path: '/adminlogin' })
                    } else {
                        console.log(res.data.msg)
                    }
                }
            })
        },
        delc(index) {
            var _this = this;
            axios.post(plus.path + '/article/delete/comment', {
                id: _this.$route.query.id,
                cid: _this.comment[index]._id,
                token: window.localStorage.getItem('token')
            }).then(function(res) {
                if (res.data.state == 1) {
                    _this.$message('删除成功');
                    _this.getcomment();

                } else {
                    if (res.data.state == '401') {
                        _this.$router.push({ path: '/adminlogin' })
                    } else {
                        console.log(res.data.msg)
                    }
                }
            })
        },
        delr(indexs, index) {
            var _this = this;
            var childarr = _this.comment[index].child;
            var reid = childarr[indexs].reid;
            axios.post(plus.path + '/article/delete/reply', {
                id: _this.$route.query.id,
                cid: _this.comment[index]._id,
                rid: reid,
                token: window.localStorage.getItem('token')
            }).then(function(res) {
                if (res.data.state == 1) {
                    _this.$message('删除成功');
                    _this.getcomment();

                } else {
                    if (res.data.state == '401') {
                        _this.$router.push({ path: '/adminlogin' })
                    } else {
                        console.log(res.data.msg)
                    }
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getcomment()
        },
        update() {
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
            axios.post(plus.path + '/api/article/update', {
                title: _this.title,
                content: _this.content,
                id: _this.$route.query.id,
                intro: _this.intro,
                tagId: _this.tagId,
                token: window.localStorage.getItem('token')
            }).then(function(res) {
                if (res.data.state == 1) {
                    _this.$message('发表成功');
                    _this.getinfo();
                }
            })
        },
        getTag() {
            var _this = this;
            axios.get(plus.path + '/api/article/tag')
                .then(function(res) {
                    if (res.data.status == '0000') {
                        _this.tagList = res.data.data;
                    }
                })
        }
    },
    components: {
        quillEditor
    },
}
</script>
