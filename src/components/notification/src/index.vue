<template>
  <div>
    <el-popover
      popper-class="notification-popper-class"
      placement="bottom"
      :width="300"
      trigger="click"
    >
      <slot></slot>
      <template #reference>
        <el-badge :value="value" :max="max" :is-dot="isDot">
          <component :is="`el-icon-${toLine(icon)}`"></component>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { toLine } from "@/utils";
const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: "Bell",
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: "",
  },
  // 最大数量
  max: {
    type: Number,
    default: 99,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
