<template>
  <div>
    <choose-area @change="handleAreaChange($event)"></choose-area>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const handleAreaChange = (data: any) => {
  console.log(data);
};
</script>

<style lang="scss" scoped></style>
