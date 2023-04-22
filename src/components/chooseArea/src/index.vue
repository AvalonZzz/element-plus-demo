<template>
  <div>
    <el-select placeholder="请选择省份" clearable v-model="province">
      <el-option
        v-for="item in provinces"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      style="margin: 0 20px"
      placeholder="请选择城市"
      clearable
      v-model="city"
      :disabled="!province"
    >
      <el-option
        v-for="item in citys"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      placeholder="请选择区域"
      clearable
      v-model="area"
      :disabled="!province || !city"
    >
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import allAreas from "../lib/pca-code.json";

interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}

interface Data {
  name: string;
  code: string;
}

const emits = defineEmits(["change"]);

// 下拉框选中省份的值
let province = ref<string>("");
// 下拉框选中城市的值
let city = ref<string>("");
// 下拉框选中区域的值
let area = ref<string>("");
// 所有省份数据
let provinces = ref(allAreas);

// 当前选中省份下城市的数据
let citys = computed(() => {
  if (!province) return [];
  else {
    let result = provinces.value.find((item) => item.code === province.value);
    return result ? result.children : [];
  }
});
// 当前选中城市下区域的数据
let areas = computed(() => {
  if (!city) return [];
  else {
    let result = citys.value.find((item) => item.code === city.value);
    return result ? result.children : [];
  }
});

// 监测省份，省份变动清空城市和区域
watch(province, (val) => {
  city.value = "";
  area.value = "";
});
// 监测城市，城市变动清空区域
watch(city, (val) => {
  area.value = "";
});
// 监测区域，当区域有值的时候更新父组件数据
watch(area, (val) => {
  if (val) {
    let provinceData: Data = {
      code: province.value,
      name: provinces.value.find((item) => item.code === province.value)!.name,
    };
    let cityData: Data = {
      code: city.value,
      name: citys.value.find((item) => item.code === city.value)!.name,
    };
    let areaData: Data = {
      code: val,
      name: areas.value.find((item) => item.code === val)!.name,
    };
    emits("change", {
      provinceData,
      cityData,
      areaData,
    });
  }
});
</script>

<style lang="scss" scoped></style>
