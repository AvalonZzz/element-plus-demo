<template>
  <div class="trend">
    <div
      class="text"
      :style="{ color: type === 'up' ? upTextColor : downTextColor }"
    >
      <slot name="default" v-if="slots.default"></slot>
      <span v-else>{{ text }}</span>
    </div>
    <div class="icon">
      <!-- <el-icon-arrowup
        v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : 'green' }"
      ></el-icon-arrowup>
      <el-icon-arrowdown
        v-else
        :style="{ color: !reverseColor ? downIconColor : 'red' }"
      ></el-icon-arrowdown> -->
      <component
        :is="`el-icon-${toLine(upIcon)}`"
        v-if="type === 'up'"
        :style="{ color: !reverseColor ? upIconColor : 'green' }"
      ></component>
      <component
        :is="`el-icon-${toLine(downIcon)}`"
        v-else
        :style="{ color: !reverseColor ? downIconColor : 'red' }"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toLine } from "@/utils";
import { useSlots } from "vue";
const props = defineProps({
  // 标记当前趋势是上升（up）还是下降（down）
  type: {
    type: String,
    default: "up",
  },
  // 趋势显示的文字
  // 1. 父组件传递过来的数据
  // 2. 插槽
  text: {
    type: String,
    default: "趋势",
  },
  reverseColor: {
    type: Boolean,
    default: false,
  },
  upIcon: {
    type: String,
    default: "ArrowUp",
  },
  upIconColor: {
    type: String,
    default: "red",
  },
  upTextColor: {
    type: String,
    default: "black",
  },
  downIcon: {
    type: String,
    default: "ArrowDown",
  },
  downIconColor: {
    type: String,
    default: "green",
  },
  downTextColor: {
    type: String,
    default: "black",
  },
});

const slots = useSlots();
</script>

<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  margin-right: 10px;
  .text {
    font-size: 12px;
    margin-right: 10px;
  }
  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
