<template>
  <div class="put-box">
    <el-input v-model="content" style="margin-bottom: 30px" placeholder="文章标题" type="textarea" :auto-size="true"></el-input>
    <div class="group f-cb">
      <div class="group-img" v-for="(item,index) in photos" :key="index" :style="{backgroundImage:'url('+item+')'}">
        <span class="group-img-delete" @click="deletes(index)">删除</span>
      </div>
      <div class="group-img"><input type="file" :value="value" @change="Acardpic($event)"></div>
    </div>
    <div class="publish-btn">
      <el-button @click="publish()" class="fl">发表</el-button>
    </div>
  </div>
</template>
<style>
.put-box {
    padding: 50px;
  }
.group {
  padding: 30px;
}
.group-img {
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px dashed #eee;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
}
.group-img input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.group-img-delete {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  top: 0;
  left: 0;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  display: none;
}
.group-img:hover .group-img-delete {
  display: block;
}
</style>

<script>
import plus from '../public.js';
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      photos: [],
      value: null,
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getInfo()
    }
  },
  methods: {
    Acardpic: function(imgFile) {
      var filextension = imgFile.target.value.substring(
        imgFile.target.value.lastIndexOf("."),
        imgFile.target.value.length
      );
      filextension = filextension.toLowerCase();
      var file = imgFile.target.files[0],
        fileSize = 0;
      fileSize = file.size / 1024;
      if (fileSize > 2048) {
        this.$toast("不能超过2mb");
        return false;
      } else {
        if (
          filextension != ".jpg" &&
          filextension != ".gif" &&
          filextension != ".jpeg" &&
          filextension != ".png" &&
          filextension != ".bmp"
        ) {
          this.$toast("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢!");
        } else {
          var _this = this;
          var fd = new FormData();
          fd.append("photos", file);
          axios({
            method: "post",
            url: plus.path + "/api/file/photos",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: fd
          }).then(function(res) {
             _this.photos.push(res.data.data.filename)
          });
        }
      }
      this.value = null;
    },
    publish() {
      if (!this.content) {
        return;
      }
      let url;
      if (this.$route.query.id) {
        url = '/api/think/edit'
      } else {
        url = '/api/think/info'
      }
      axios.post(plus.path + url, {
        content: this.content,
        photos: this.photos.join(','),
        id: this.$route.query.id,
        token: window.localStorage.token,
      }).then(res => {
        if (res.data.status == '0000') {
          this.$router.push({path: '/home/think'})
        }
      })
    },
    deletes(index) {
      this.photos.splice(index,1);
    },
    getInfo() {
      axios.get(plus.path + '/api/think/info', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.data.status == '0000') {
          this.content = res.data.data.content;
          this.photos = res.data.data.photos;
        }
      })
    }
  }
}
</script>

