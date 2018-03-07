<template>
    <div id="admin_login">
        <div class="login-box">
            <el-input v-model="ph" placeholder="请输入账号" class="login-input"></el-input>
            <el-input v-model="pw" placeholder="请输入密码" type="password" class="login-input"></el-input>
            <el-button type="primary" class="login-btn" @click="login()">登录</el-button>
        </div>
    </div>
</template>
<style>
    .login-box {
        width: 200px;
        position: absolute;
        left: 50%;
        margin-left: -100px;
        top: 200px;
    }

    .login-input {
        margin-bottom: 10px;
    }

    .login-btn {
        width: 200px;
    }
</style>
<script>
    import plus from '../public.js';
    import axios from 'axios';
    export default {
        data(){
            return {
                ph: '',
                pw: ''
            }
        },
        methods: {
            login(){
                if (!this.ph) {
                    this.$message({
                        message: '请输入账号',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.pw) {
                    this.$message({
                        message: '请输入密码',
                        type: 'warning'
                    });
                    return;
                }
                var _this = this;
                axios.post(plus.path + '/api/admin/login', {
                    account: _this.ph,
                    password: _this.pw
                })
                    .then(function (res) {
                        if(res.data.status == '0000'){
                            window.localStorage.setItem('token',res.data.data.token);
                            window.localStorage.setItem('host',JSON.stringify(res.data.data));
                            _this.$router.push({ path: '/'})
                        }else{
                            _this.$message({
                                message: res.data.msg,
                                type: 'warning'
                            });
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
          list(){
                axios.get(plus.path + '/api/article/list')
          }
        }
    }
</script>
