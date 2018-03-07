<template>
    <div>
        <div class="add-btn"><el-button @click="add">添加文章</el-button></div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" @click="deletes(scope.$index)" size="small">删除</el-button>
                    <el-button type="text" @click="check(scope.$index)" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="limit"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<style>
    .add-btn {
        margin: 20px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default {
        data(){
            return {
                tableData: [],
                page: 1,
                total: null,
                limit: 10
            }
        },
        activated(){
            this.ajaxlist();
        },
        methods: {
            ajaxlist(){
                var _this = this;
                axios.get(plus.path + '/api/article/list', {
                    params: {
                        page: _this.page,
                        limit: _this.limit
                    }
                }).then(function (data) {
                    if (data.data.status == '0000') {
                        _this.tableData = data.data.data.list;
                        _this.total = data.data.data.total;
                    }
                })
            },
            deletes(index){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(plus.path + '/article/delete/article', {
                        id: _this.tableData[index]._id,
                        token: window.localStorage.getItem('token')
                    }).then(function (res) {
                        if (res.data.state == 1) {
                            _this.$message('删除成功');
                            _this.ajaxlist()
                        } else {
                            if (res.data.state == '401') {
                                _this.$router.push({path: '/adminlogin'})
                            } else {
                                console.log(res.data.msg)
                            }
                        }
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            check(index){
                this.$router.push({path: '/home/articleinfo', query: {id: this.tableData[index].id}})
            },
            handleCurrentChange(val){
                this.page = val;
                this.ajaxlist()
            },
            add(){
                this.$router.push({path: '/home/article'})
            }
        }
    }
</script>
