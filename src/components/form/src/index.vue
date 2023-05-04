<template>
  <div>
    <el-form
      v-if="model"
      :model="model"
      :rules="rules"
      v-bind="$attrs"
      :validate-on-rule-change="false"
    >
      <template v-for="(item, index) in options" :key="index">
        <el-form-item
          v-if="!item.children || !item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
          ></component>
        </el-form-item>
        <el-form-item
          v-if="item.children && item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            v-bind="item.attrs"
            :is="`el-${item.type}`"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
          >
            <component
              v-for="(child, i) in item.children"
              :key="i"
              :is="`el-${child.type}`"
              :value="child.value"
              :label="child.label"
            ></component>
          </component>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted, watch } from "vue";
import { FormOptions } from "./types/types";

let props = defineProps({
  options: {
    required: true,
    type: Array as PropType<FormOptions[]>,
  },
});

let model = ref<any>(null);
let rules = ref<any>(null);

let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.map((item) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
    });
    model.value = m;
    rules.value = r;
  }
};

onMounted(() => {
  initForm();
});

watch(
  () => props.options,
  () => {
    initForm();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped></style>
