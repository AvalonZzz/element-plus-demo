<template>
  <div>
    <notification :value="50">
      <template #default>
        <list
          :lists="lists"
          :actions="actions"
          @click-item="clickItem"
          @clickAction="clickAction"
        ></list>
      </template>
    </notification>
    <br />
    <notification :value="50" :max="30"></notification>
    <br />
    <notification :value="50" :is-dot="true"></notification>
    <br />
    <notification :value="50" icon="SwitchButton"></notification>
    <div v-trim:number.left="'12 334 789'"></div>
  </div>
</template>

<script lang="ts" setup>
import { lists, actions } from "./data";
let clickItem = (val: any) => {
  console.log(val);
};
let clickAction = (val: any) => {
  console.log(val);
};
const vTrim = {
  mounted(el: any, binding: any, vnode: any) {
    console.log(el, binding, vnode);
    let { value, arg, modifiers } = binding;
    if (arg === "number") {
      value = parseInt(value);
      console.log(value);
    }

    if (modifiers.left) {
      value += 100;
    }
    el.innerHTML = value;
  },
};
</script>

<style lang="scss" scoped></style>
