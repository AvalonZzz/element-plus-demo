<template>
  <div>
    <el-date-picker
      v-model="startDate"
      type="date"
      :placeholder="startPlaceholder"
      :disabled-date="startDisabledDate"
      v-bind="$attrs.startDateOptions"
    />
    <el-date-picker
      v-model="endDate"
      type="date"
      :placeholder="endPlaceholder"
      :disabled="disableEndDate"
      :disabled-date="endDisabledDate"
      v-bind="$attrs.endDateOptions"
    />
  </div>
</template>

<script lang="ts" setup>
import { start } from "repl";
import { ref, watch } from "vue";
let props = defineProps({
  startPlaceholder: {
    type: String,
    default: "请选择开始日期",
  },
  endPlaceholder: {
    type: String,
    default: "请选择结束日期",
  },
  disableBeforeToday: {
    type: Boolean,
    default: true,
  },
});

let emits = defineEmits(["startDateChange", "endDateChange"]);

let startDate = ref<Date | null>(null);
let endDate = ref<Date | null>(null);
let disableEndDate = ref<boolean>(true);

const startDisabledDate = (time: Date) => {
  if (props.disableBeforeToday) {
    return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;
  }
};
const endDisabledDate = (time: Date) => {
  if (startDate.value) {
    return time.getTime() < startDate.value.getTime() + 1000 * 60 * 60 * 24;
  }
};

watch(startDate, (val) => {
  console.log(val);
  if (!val) {
    disableEndDate.value = true;
    endDate.value = null;
  } else {
    disableEndDate.value = false;
    emits("startDateChange", val);
  }
});

watch(endDate, (val) => {
  if (val) {
    emits("endDateChange", {
      startDate: startDate.value,
      endDate: val,
    });
  }
});
</script>

<style lang="scss" scoped></style>
