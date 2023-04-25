<template>
  <!-- <el-menu
    :collapse="collapse"
    default-active="2"
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <el-icon-menu></el-icon-menu>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon-menu></el-icon-menu>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon-menu></el-icon-menu>
      <span>导航三</span>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon-menu></el-icon-menu>
      <span>导航四</span>
    </el-menu-item>
  </el-menu> -->
  <c-menu
    :data="data"
    :collapse="collapse"
    router
    :default-active="$route.path"
  ></c-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  collapse: boolean;
}>();
let data = [
  {
    name: "首页",
    icon: "HomeFilled",
    index: "/",
  },
  {
    name: "图标选择器",
    icon: "Check",
    index: "/chooseIcon",
  },
  {
    name: "省市区选择器",
    icon: "Location",
    index: "/chooseArea",
  },
  {
    name: "趋势标记",
    icon: "Sort",
    index: "/trend",
  },
  {
    name: "时间选择",
    icon: "Timer",
    index: "/chooseTime",
  },
  {
    name: "通知菜单",
    icon: "Bell",
    index: "/notification",
  },
  {
    name: "导航菜单",
    icon: "Menu",
    index: "/menu",
  },

  {
    name: "城市选择",
    icon: "TurnOff",
    index: "/chooseCity",
  },
  {
    name: "进度条",
    icon: "ArrowDown",
    index: "/progress",
  },
  {
    name: "日历",
    icon: "ScaleToOriginal",
    index: "/calendar",
  },
  {
    name: "表单",
    icon: "Setting",
    index: "/calendar",
  },
  {
    name: "表格",
    icon: "HelpFilled",
    index: "/table",
  },
];
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
