<template>
  <div :class="{ 'm-choose-icon-dialog-body-height': isScroll }">
    <el-dialog v-model="dialogVisible" v-bind="$attrs">
      <template #default>
        <c-form
          ref="form"
          :options="options"
          :httpRequest="httpRequest"
          @onPreview="onPreview"
          @onSuccess="onSuccess"
          @onError="onError"
          @onRemove="onRemove"
          @onProgress="onProgress"
          @onChange="onChange"
          @onExceed="onExceed"
          @beforeRemove="beforeRemove"
          @beforeUpload="beforeUpload"
        >
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </c-form>
      </template>
      <template #footer>
        <slot name="footer" :form="form"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";
import { FormInstance, FormOptions } from "../../form/src/types/types";
let props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },

  isScroll: {
    type: Boolean,
    default: false,
  },

  onChange: {
    type: Function,
  },
  onSuccess: {
    type: Function,
  },
  onPreview: {
    type: Function,
  },
  onRemove: {
    type: Function,
  },
  onError: {
    type: Function,
  },
  onExceed: {
    type: Function,
  },
  onProgress: {
    type: Function,
  },
  beforeRemove: {
    type: Function,
  },
  beforeUpload: {
    type: Function,
  },
  httpRequest: {
    type: Function,
  },
});

let emits = defineEmits(["update:visible"]);

// 弹出框的显示与隐藏
let dialogVisible = ref<boolean>(props.visible);
// 表单实例
let form = ref<FormInstance | null>();

watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

watch(dialogVisible, (val) => {
  emits("update:visible", val);
});
</script>

<style lang="scss" scoped></style>
