<template>
  <div>
    <div style="display: flex">
      <trend text="上升" reverseColor> 上升趋势 </trend>
      <trend text="下降" reverseColor type="down"></trend>
    </div>
    <div style="display: flex">
      <trend text="上升" upIconColor="skyblue"></trend>
      <trend text="下降" type="down" downIconColor="pink"></trend>
    </div>
    <div style="display: flex">
      <trend text="上升" upIconColor="skyblue" upIcon="Check"></trend>
      <trend
        text="下降"
        type="down"
        downIconColor="pink"
        downIcon="RefreshRight"
      ></trend>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped></style>
