<template>
  <div>
    <el-card style="border-radius: 0">
      <div slot="header">
        <h4>推送历史</h4>
      </div>
      <div class="demo">
        <el-row :gutter="20">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="告警设备">
              <el-input v-model="formInline.deviceAddress" placeholder="告警设备"></el-input>
            </el-form-item>
            <el-form-item label="推送内容">
              <el-input v-model="formInline.pushInfo" placeholder="推送内容"></el-input>
            </el-form-item>
            <el-form-item label="推送类型">
              <el-select v-model="formInline.pushType" @change="search" placeholder="全部">
                <el-option v-for="item in pushTypeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推送状态">
              <el-select v-model="formInline.state" placeholder="全部">
                <el-option v-for="item in stateList" :label="item.label" :value="item.value" :key="item.value"></el-option>
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
              <!-- <el-button type="text" @click="onEdit(scope.row)">点击打开 Dialog</el-button> -->
              <el-button type="primary" @click="onEdit(scope.row)" icon="el-icon-edit" size="small">修改</el-button>
              <el-button type="primary" @click="onDelete(scope.row)" icon="el-icon-delete" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <el-form label-position="right" label-width="80px" v-if="row" :model="row">
            <el-form-item label="名称">
              <el-input v-model="row.deviceAddress"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="row.type"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="row.state"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
const pushTypeList = [
  { label: "短信", value: "0" },
  { label: "app", value: "1" },
  { label: "web", value: "2" }
];
const stateList = [
  { label: "推送失败", value: "10" },
  { label: "正在推送", value: "11" },
  { label: "推送成功", value: "12" }
];
export default {
  data() {
    return {
      formInline: {
        deviceAddress: "",
        pushInfo: ""
      },
      row: undefined,
      pushTypeList,
      stateList,
      dialogVisible: false,
      tableData: [
        {
          date: "213",
          name: "sfsdf",
          address: "sdffdsfdsfds"
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
      this.dialogVisible = true;
      this.row = row;
      console.log(row);
    },
    onDelete(row) {
      console.log(row);
    },
    search(pushType) {
      console.log(pushType);
    },
    init({ deviceAddress, pushType, state, pushInfo } = {}) {
      this.$Api.get({
        url: "/v1/auths/monitor/pushhistory/page",
        headers: {
          deviceAddress,
          pushType,
          state,
          pushInfo
        },
        cb: res => {
          console.log(res);
        }
      });
    }
  },
  mounted: function() {
    this.init();
  }
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