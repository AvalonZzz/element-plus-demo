<template>
  <!-- <div> -->
  <router-view></router-view>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
</script>

<style lang="scss">
@import "./styles/ui.scss";
@import "./styles/base.scss";
.notification-popper-class {
  padding: 0 !important;
}
</style>
