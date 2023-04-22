<template>
  <div>
    <el-progress
      v-bind="$attrs"
      :percentage="p"
      :isAnimation="isAnimation"
    ></el-progress>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
let props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
  isAnimation: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Number,
    default: 3000,
  },
});
let p = ref(0);
onMounted(() => {
  if (props.isAnimation) {
    let t = Math.ceil(props.time / props.percentage);
    let timer = setInterval(() => {
      p.value += 1;
      if (p.value >= props.percentage) {
        p.value = props.percentage;
        clearInterval(timer);
      }
    }, t);
  }
});
</script>

<style lang="scss" scoped></style>
