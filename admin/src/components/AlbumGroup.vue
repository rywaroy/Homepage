<template>
  <div class="group f-cb">
      <div class="group-img" v-for="(item,index) in list" :key="index" :style="{backgroundImage:'url('+item.url+')'}"></div>
      <div class="group-img"><input type="file" @change="Acardpic($event)"></div>
  </div>
</template>
<script>
import axios from "axios";
import plus from "../public";
export default {
  data() {
    return {
      list: []
    };
  },
  activated() {
    this.getGroup();
  },
  methods: {
    getGroup() {
      var _this = this;
      axios.get(plus.path + "/api/album/group?id=" + this.$route.query.id)
        .then(function(res) {
          if (res.data.status == "0000") {
            _this.list = res.data.data;
          }
        });
    },
    addGroup(url) {
        var _this = this;
        axios.post(plus.path + '/api/album/group',{
                url:url,
                id:this.$route.query.id,
                token:window.localStorage.token
            }).then(function(res){
                if(res.data.status == '0000'){
                    _this.list.push({url:url})
                }
            })
    },
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
          //            var path, img = document.getElementById("hand").getElementsByTagName("img")[0];
          fd.append("photos", file);
          axios({
            method: "post",
            url: plus.path + "/api/file/photos",
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: fd
          }).then(function(res) {
            _this.addGroup(res.data.data.filename)
          });
        }
      }
    }
  }
};
</script>
<style scoped>
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
</style>

