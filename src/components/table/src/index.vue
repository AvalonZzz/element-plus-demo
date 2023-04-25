<template>
  <div>
    <el-table
      :data="data"
      v-loading="isLoading"
      :element-loading-text="elementLoadingText"
      :element-loading-spinner="elementLoadingSpinner"
      :element-loading-svg="elementLoadingSvg"
      :element-loading-svg-view-box="elementLoadingSvgViewBox"
      :element-loading-background="elementLoadingBackground"
    >
      <template v-for="(item, index) in tableOptions" :key="index">
        <el-table-column
          :label="item.label"
          :align="item.align"
          :width="item.width"
        >
          <template #default="scope">
            <template v-if="scope.$index + scope.column.id === currentEdit">
              <div style="display: flex; align-items: center">
                <el-input
                  size="small"
                  v-model="scope.row[item.prop!]"
                ></el-input>
                <div @click="clickEditCell">
                  <slot
                    name="editCell"
                    v-if="$slots.editCell"
                    :scope="scope"
                  ></slot>
                  <div class="icons" v-else>
                    <el-icon-check
                      class="check"
                      @click="confirm(scope)"
                    ></el-icon-check>
                    <el-icon-close
                      class="close"
                      @click="close(scope)"
                    ></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component
                :is="`el-icon-${toLine(editIcon)}`"
                class="edit"
                @click="clickEdit(scope)"
                v-if="item.editable"
              ></component>
            </template>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        :label="actionOptions!.label"
        :align="actionOptions!.align"
        :width="actionOptions!.width"
      >
        <template #default="scope">
          <slot name="action" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType } from "vue";
import { TableOptions } from "./types";
import { toLine } from "@/utils";

let props = defineProps({
  // 表格配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true,
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // loading提示文字配置
  elementLoadingText: {
    type: String,
  },
  // loading图标配置
  elementLoadingSpinner: {
    type: String,
  },
  // loading svg配置
  elementLoadingSvg: {
    type: String,
  },
  // loading svg位置
  elementLoadingSvgViewBox: {
    type: String,
  },
  // loading 背景色配置
  elementLoadingBackground: {
    type: String,
  },
  // 可编辑单元格的图标
  editIcon: {
    type: String,
    default: "edit",
  },
});

let emits = defineEmits(["confirm", "close"]);

// 表单的配置
let tableOptions = computed(() => {
  return props.options.filter((item) => !item.action);
});
// 操作项的配置
let actionOptions = computed(() => {
  return props.options.find((item) => item.action);
});

// 是否是加载状态
let isLoading = computed(() => {
  return !props.data || !props.data.length;
});

// 当前编辑的单元格的唯一标识，$index+column.id
let currentEdit = ref<string>("");
// 点击单元格编辑的事件
const clickEdit = (scope: any) => {
  console.log(scope);
  currentEdit.value = scope.$index + scope.column.id;
};
// 点击自定义确认和取消的事件
const clickEditCell = (scope: any) => {
  currentEdit.value = "";
};
// 点击勾的事件
const confirm = (scope: any) => {
  emits("confirm", scope);
};
// 点击叉的事件
const close = (scope: any) => {
  emits("close", scope);
};
</script>

<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
.edit {
  position: relative;
  top: 2px;
  left: 4px;
  cursor: pointer;
}
.icons {
  display: flex;
  svg {
    margin-left: 6px;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}
</style>
