<template>
  <div>
    <c-progress isAnimation :percentage="60"></c-progress>
    <c-progress isAnimation :percentage="60" type="circle"></c-progress>
    <c-progress
      isAnimation
      :percentage="60"
      type="circle"
      :text-inside="true"
      :stroke-width="22"
      status="warning"
    ></c-progress>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
svg {
  width: 126px;
  height: 126px;
}
</style>
