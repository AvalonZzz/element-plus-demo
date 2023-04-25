<template>
  <div>
    <c-table
      :data="tableData"
      :options="options"
      element-loading-text="加载中..."
      element-loading-background="rgba(0,0,0,.8)"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      edit-icon="Bottom"
      @confirm="confirm"
    >
      <template #date="{ scope }">
        <el-icon-timer></el-icon-timer>
        {{ scope.row.date }}
      </template>
      <template #name="{ scope }">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>name: {{ scope.row.name }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
      <template #action="{ scope }">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </template>
      <template #editCell="{ scope }">
        <div style="display: flex; margin-left: 4px">
          <el-button size="mini" type="primary">确认</el-button>
          <el-button size="mini">取消</el-button>
        </div>
      </template>
    </c-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
interface TableData {
  name: string;
  date: string;
  address: string;
}
let tableData = ref<TableData[]>([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
let options = [
  {
    label: "日期",
    prop: "date",
    slot: "date",
    align: "center",
    editable: true,
  },
  {
    label: "姓名",
    prop: "name",
    slot: "name",
    align: "center",
  },
  {
    label: "地址",
    prop: "address",
    align: "center",
    editable: true,
  },
  {
    label: "操作",
    align: "center",
    action: true,
  },
];

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const confirm = (scope: any) => {
  console.log(scope);
};
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>
