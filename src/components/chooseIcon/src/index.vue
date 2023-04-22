<template>
  <div>
    <el-button @click="handleClick">
      <slot></slot>
    </el-button>
    <div class="m-choose-icon-dialog-body-height">
      <el-dialog :title="title" v-model="dialogVisible">
        <div class="container">
          <div
            class="item"
            v-for="(item, index) in Object.keys(Icons)"
            @click="handleCopy(item)"
          >
            <div class="icon">
              <component :is="`el-icon-${toLine(item)}`"></component>
            </div>
            <div class="text">{{ item }}</div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "@/utils";
import { useCopy } from "@/hooks/useCopy/index";
let props = defineProps<{
  title: string;
  visible: boolean;
}>();
let emits = defineEmits(["update:visible"]);

let dialogVisible = ref(props.visible);

// 点击图标，弹出弹窗
const handleClick = () => {
  emits("update:visible", !props.visible);
};
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);
watch(dialogVisible, (val) => {
  emits("update:visible", val);
});

// 点击图标
const handleCopy = (item: string) => {
  let text = `<el-icon-${toLine(item)} />`;
  useCopy(text);
  // 关闭弹框
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 70px;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
}
.icon {
  flex: 1;
}
svg {
  width: 2em;
  height: 2em;
}
</style>
