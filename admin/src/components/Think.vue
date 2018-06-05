<template>
  <div>
    <div class="add-btn"><el-button @click="add">添加说说</el-button></div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
    <el-table-column
            prop="id"
            label="id">
    </el-table-column>
    <el-table-column
            prop="content"
            label="内容">
    </el-table-column>
    <el-table-column
            prop="time"
            label="创建时间">
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
<script>
import plus from '../public.js';
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      total: null,
      limit: 10,
      page: 1,
    }
  },
  mounted() {
    this.getThink();
  },
  methods: {
    getThink() {
      axios.get(plus.path + '/api/think/list', {
        params: {
          limit: this.limit,
          page: this.page,
        }
      }).then(res => {
          if (res.data.status == '0000') {
            this.tableData = res.data.data.list;
            this.total = res.data.data.count;
          }
        })
    },
    deletes(index) {
      axios.post(plus.path + '/api/think/delete', {
        id: this.tableData[index].id,
        token: window.localStorage.token,
      }).then(res => {
        if (res.data.status == '0000') {
          this.getThink();
        }
      })
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getThink();
    },
    add() {
      this.$router.push({path: '/home/thinkinfo'})
    },
    check(index) {
      this.$router.push({path: '/home/thinkinfo', query:{id: this.tableData[index].id}});
    }
  }
}
</script>
