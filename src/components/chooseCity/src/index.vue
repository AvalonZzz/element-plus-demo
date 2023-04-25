<template>
  <el-popover
    v-model:visible="visible"
    placement="bottom-start"
    :width="430"
    trigger="click"
  >
    <template #reference>
      <div class="result">
        <div>{{ result }}</div>
        <div>
          <el-icon-arrowdown :class="{ rotate: visible }"></el-icon-arrowdown>
        </div>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="按城市"></el-radio-button>
            <el-radio-button label="按省份"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :offset="1" :span="13">
          <el-select
            v-model="selectValue"
            class="m-2"
            size="large"
            filterable
            placeholder="请搜索城市"
            :filter-method="filterMethod"
            @change="changeSelect"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <template v-if="radioValue === '按城市'">
        <div class="city">
          <div
            class="city-item"
            @click="clickChar(key)"
            v-for="(value, key) in cities"
            :key="key"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <el-row
            style="margin-bottom: 10px"
            v-for="(value, key) in cities"
            :key="key"
            :id="key"
          >
            <el-col :span="2">{{ key }}:</el-col>
            <el-col :span="22">
              <div class="city-name">
                <div
                  class="city-name-item"
                  v-for="(item, index) in value"
                  :key="item.id"
                  @click="clickCityItem(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-scrollbar>
      </template>
      <template v-else>
        <div class="province">
          <div
            class="province-item"
            v-for="(value, key) in provinces"
            :key="key"
            @click="clickChar(key)"
          >
            {{ key }}
          </div>
        </div>
        <el-scrollbar max-height="300px">
          <template
            v-for="(item, index) in Object.values(provinces)"
            :key="index"
          >
            <template v-for="province in item" :key="index">
              <el-row style="margin-bottom: 10px" :id="province.id">
                <el-col :span="3">{{ province.name }}:</el-col>
                <el-col :span="21">
                  <div class="city-name">
                    <div
                      class="city-name-item"
                      v-for="(cityName, index) in province.data"
                      :key="index"
                      @click="clickProvinceItem(cityName)"
                    >
                      {{ cityName }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </template>
          </template>
        </el-scrollbar>
      </template>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import city from "../lib/city";
import { City } from "./types";
import province from "../lib/province.json";
// 分发事件
let emits = defineEmits(["chooseCity", "chooseProvince"]);
// 最终选择的结果
let result = ref<string>("请选择");
//弹出层显示的控制
let visible = ref<boolean>(false);
// 单选框的值（按城市还是按省份）
let radioValue = ref<string>("按城市");
// 下拉框的值
let selectValue = ref<string>("");
// 下拉框的选项
let options = ref<City[]>();
let allCity = ref<City[]>([]);
let cities = ref(city.cities);
let provinces = ref(province);

// 点击每个城市的事件
let clickCityItem = (item: City) => {
  result.value = item.name;
  visible.value = false;
  emits("chooseCity", item);
};

let clickChar = (key: string) => {
  const el = document.getElementById(key);
  if (el) el.scrollIntoView();
};

let clickProvinceItem = (name: string) => {
  console.log(name);
  result.value = name;
  visible.value = false;
  emits("chooseProvince", name);
};

// 下拉框的change事件
let changeSelect = (val: number) => {
  let city = allCity.value.find((item) => item.id === val)!;
  result.value = city.name;
  if (radioValue.value === "按城市") {
    emits("chooseCity", city);
  } else {
    emits("chooseProvince", city.name);
  }
};

onMounted(() => {
  let values = Object.values(cities.value).flat(2);
  options.value = values;
  allCity.value = values;
});

// 自定义搜索过滤
let filterMethod = (val: string) => {
  let values = Object.values(cities.value).flat(2);
  if (val === "") {
    options.value = values;
  } else {
    if (radioValue.value === "按城市") {
      // 中文和拼音一起过滤
      options.value = values.filter((item) => {
        return item.name.includes(val) || item.spell.includes(val);
      });
    } else {
      // 中文过滤
      options.value = values.filter((item) => {
        return item.name.includes(val);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}
svg {
  width: 1em;
  height: 1em;
  position: relative;
  top: 2px;
  margin-left: 4px;
  transition: all 0.25s;
}
.rotate {
  transform: rotate(180deg);
}
.container {
  padding: 6px;
  .city,
  .province {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    &-item {
      padding: 3px 6px;
      margin-right: 8px;
      margin-bottom: 8px;
      border: 1px solid #eee;
      cursor: pointer;
    }
  }
}
.city-name {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    margin-right: 6px;
    margin-bottom: 6px;
  }
}
</style>
