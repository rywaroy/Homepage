<template>
  <div class="addalbum">
      <div class="addalbum-img" :style="{backgroundImage:'url('+url+')'}"><input type="file" @change="Acardpic($event)"></div> 
      <el-input v-model="title" placeholder="请输入内容" style="width:300px;margin-top:20px;"></el-input>
      <el-button type="primary" @click="addalbum()">提交</el-button>
  </div>
</template>
<script>
import axios from 'axios'
import plus from '../public'
export default {
  data(){
      return{
          title:'',
          url:''
      }
  },
  methods:{
      Acardpic: function(imgFile) {
            var filextension = imgFile.target.value.substring(imgFile.target.value.lastIndexOf("."), imgFile.target.value.length);
            filextension = filextension.toLowerCase();
            var file = imgFile.target.files[0], fileSize = 0;
            fileSize = file.size / 1024
            if (fileSize > 2048) {
                this.$toast("不能超过2mb");
                return false;
            } else {
                if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
                    this.$toast("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢!");
                }
                else {
                    var _this = this;
                    var fd = new FormData();
                    //            var path, img = document.getElementById("hand").getElementsByTagName("img")[0];
                    fd.append("photos", file);
                    axios({
                        method: 'post',
                        url: plus.path + '/api/file/photos',
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        data: fd
                    }).then(function(res) {
                        _this.url = res.data.data.filename;
                    })
                }
            }
        },
        addalbum(){
            var _this = this;
            axios.post(plus.path + '/api/album/album',{
                url:this.url,
                title:this.title,
                token:window.localStorage.token
            }).then(function(res){
                if(res.data.status == '0000'){
                    _this.$router.go(-1)
                }
            })
        }
  
  
  
  
  }
}
</script>

<style scoped>
.addalbum {
  padding: 30px;
}
.addalbum-img {
  width: 300px;
  height: 300px;
  position: relative;
  border: 1px dashed #eee;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.addalbum-img input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
</style>
