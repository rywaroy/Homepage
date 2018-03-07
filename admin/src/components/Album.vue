<template>
  <div class="album">
      <el-button type="primary" @click="add()">添加</el-button>
      <div class="album-list f-cb">
          <router-link tag="div" :to="{name:'albumgroup',query:{id:item.id}}" class="album-box" v-for="(item,index) in list" :key="index">
              <div class="album-img" :style="{backgroundImage:'url('+item.img+')'}"></div>
                <div class="album-title">{{item.title}}</div>
          </router-link>
          
      </div>
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
  mounted() {
    this.getAlbum();
  },
  methods: {
    add() {
      this.$router.push({ name: "addalbum" });
    },
    getAlbum() {
      var _this = this;
      axios.get(plus.path + "/api/album/album").then(function(res) {
        if (res.data.status == "0000") {
          _this.list = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.album {
  padding: 30px;
}
.album-box {
  width: 100px;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.album-img {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.album-title{
    font-size: 16px;
    text-align: center;
    line-height: 30px;
}
</style>
