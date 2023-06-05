<template>
  <div>
    <el-form
      v-if="model"
      ref="form"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
      v-bind="$attrs"
    >
      <template v-for="(item, index) in options" :index="index">
        <el-form-item
          v-if="!item.children || !item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            v-if="item.type !== 'upload' && item.type !== 'editor'"
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop! ]"
            :placeholder="item.placeholder"
          ></component>
          <el-upload
            v-if="item.type === 'upload'"
            v-bind="item.uploadAttrs"
            :onPreview="onPreview"
            :onSuccess="onSuccess"
            :onError="onError"
            :onRemove="onRemove"
            :onProgress="onProgress"
            :onChange="onChange"
            :onExceed="onExceed"
            :beforeRemove="beforeRemove"
            :beforeUpload="beforeUpload"
            :httpRequest="httpRequest"
          >
            <slot name="uploadArea"></slot>
            <slot name="uploadTip"></slot>
          </el-upload>
          <div id="editor" v-if="item.type === 'editor'"></div>
        </el-form-item>
        <el-form-item
          v-if="item.children && item.children.length"
          :label="item.label"
          :prop="item.prop"
        >
          <component
            :is="`el-${item.type}`"
            v-bind="item.attrs"
            v-model="model[item.prop!]"
            :placeholder="item.placeholder"
          >
            <component
              v-for="(child, i) in item.children"
              :key="i"
              :is="`el-${child.type}`"
              :label="child.label"
              :value="child.value"
            ></component>
          </component>
        </el-form-item>
      </template>
      <el-form-item>
        <slot name="action" :form="form" :model="model"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType, onMounted, watch, nextTick } from "vue";
import { FormInstance, FormOptions } from "./types/types";
import E from "wangeditor";
import cloneDeep from "lodash/cloneDeep";

let props = defineProps({
  // 表单配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  // 用户自定义上传方法
  httpRequest: {
    type: Function,
  },
});

let emits = defineEmits([
  "onPreview",
  "onSuccess",
  "onError",
  "onRemove",
  "onProgress",
  "onChange",
  "onExceed",
  "beforeRemove",
  "beforeUpload",
]);

let model = ref<any>(null);
let rules = ref<any>(null);
let form = ref<FormInstance | null>();
let edit = ref();

const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {};
    let r: any = {};
    props.options.forEach((item: FormOptions) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;

      if (item.type === "editor") {
        // 初始化富文本
        nextTick(() => {
          if (document.getElementById("editor")) {
            initEditor(item);
          }
        });
      }
    });
    model.value = cloneDeep(m);
    rules.value = cloneDeep(r);
  }
};

const initEditor = (item: FormOptions) => {
  const editor = new E("#editor");
  // 设置占位符
  editor.config.placeholder = item.placeholder!;
  editor.create();
  // 初始化富文本内容
  editor.txt.html(item.value);
  // 编辑器改变内容时重设model的值
  editor.config.onchange = (newVal: string) => {
    model.value[item.prop!] = newVal;
  };
  edit.value = editor;
};

// 重置表单
let resetFields = () => {
  // 重置element-plus表单
  form.value!.resetFields();
  // 重置富文本编辑器的内容
  // 获取到富文本的配置项
  if (props.options && props.options.length) {
    let editorItem = props.options.find((item) => item.type === "editor")!;
    edit.value.txt.html(editorItem.value);
  }
};

// 表单验证
let validate = () => {
  return form.value!.validate;
};

// 获取表单数据
let getFormData = () => {
  return model.value;
};

defineExpose({
  resetFields,
  validate,
  getFormData,
});

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

const onPreview = (file: any) => {
  emits("onPreview", { file });
};
const onSuccess = (response: any, file: any, fileList: any) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };
  emits("onSuccess", {
    response,
    file,
    fileList,
  });
};
const onError = (err: any, file: any) => {
  emits("onError", { err, file });
};
const onRemove = (file: any, fileList: any) => {
  emits("onRemove", { file, fileList });
};
const onProgress = (event: any, file: any, fileList: any) => {
  emits("onProgress", { event, file, fileList });
};
const onChange = (file: any, fileList: any) => {
  emits("onChange", { file, fileList });
};
const onExceed = (file: any, fileList: any) => {
  emits("onExceed", { file, fileList });
};
const beforeRemove = (file: any, fileList: any) => {
  emits("beforeRemove", { file, fileList });
};
const beforeUpload = (file: any) => {
  emits("beforeUpload", { file });
};
</script>

<style lang="scss" scoped></style>
