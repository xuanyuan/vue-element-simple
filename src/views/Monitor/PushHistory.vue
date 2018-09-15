<template>
  <div>
    <el-card style="border-radius: 0">
      <div slot="header">
        <h4>推送历史</h4>
      </div>
      <div class="demo">
        <el-row :gutter="20">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="审批人">
              <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}" :row-class-name="tableRowClassName" border style="width: 100%">
          <el-table-column prop="date" label="日期" sortable>
          </el-table-column>
          <el-table-column prop="name" label="姓名" sortable>
          </el-table-column>
          <el-table-column prop="address" label="地址" :formatter="formatter">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="onEdit(scope.row)" icon="el-icon-edit" size="small">修改</el-button>
              <el-button type="primary" @click="onDel(scope.row)" icon="el-icon-delete" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    formatter(row, column) {
      return row.address;
    },
    onEdit(row) {
      debugger
      console.log(row);
    },
    onDel(row) {
      console.log(row);
    }
  },
  mounted: function() {}
};
</script>
<style lang="less">
.demo {
  margin: 10px;
  .grid-content {
    border-radius: 4px;
    overflow: hidden;
    color: #fff;
    background: #d3dce6;
    .index-icon {
      font-size: 82px;
      color: #fff;
    }
  }
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>