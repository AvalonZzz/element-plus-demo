<template>
  <div>
    <choose-time
      :startOptions="startOptions"
      @startChange="startChange"
      @endChange="endChange"
    ></choose-time>
    <choose-date
      :startDateOptions="startDateOptions"
      @startDateChange="startDateChange"
      @endDateChange="endDateChange"
    ></choose-date>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
interface EndValue {
  startTime: string;
  endTime: string;
}
interface EndDateValue {
  startDate: Date;
  endDate: Date;
}
const startChange = (val: string) => {
  console.log("startChange", val);
};
const endChange = (val: EndValue) => {
  console.log("endChange", val);
};
let startOptions = {
  size: "mini",
  clearable: false,
};
const startDateChange = (val: Date) => {
  console.log("startDateChange", val);
};
const endDateChange = (val: EndDateValue) => {
  console.log("endDateChange", val);
};
let startDateOptions = {
  size: "mini",
  clearable: false,
};
</script>

<style lang="scss" scoped></style>
