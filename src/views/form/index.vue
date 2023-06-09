<template>
  <div>
    <c-form
      ref="form"
      label-width="100px"
      :options="options"
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
        <el-button type="primary">Click to upload</el-button>
      </template>
      <template #uploadTip
        ><div style="color: #ccc; font-size: 12px">
          jpg/png files with a size less than 500KB.
        </div></template
      >
      <template #action="scope">
        <el-button type="primary" @click="submitForm(scope)">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </template>
    </c-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FormInstance, FormOptions } from "@/components/form/src/types/types";
import { ElMessage, ElMessageBox } from "element-plus";

interface Scope {
  form: FormInstance;
  model: any;
}

let options: FormOptions[] = [
  {
    type: "input",
    value: "",
    label: "用户名",
    prop: "username",
    placeholder: "请输入用户名",
    rules: [
      { required: true, message: "用户名不能为空", trigger: "blur" },
      { min: 2, max: 6, message: "用户名在2到6位之间", trigger: "blur" },
    ],
    attrs: {
      clearable: true,
    },
  },
  {
    type: "input",
    value: "",
    label: "密码",
    prop: "password",
    placeholder: "请输入密码",
    rules: [
      { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 6, max: 15, message: "密码在6到15位之间", trigger: "blur" },
    ],
    attrs: {
      showPassword: true,
      clearable: true,
    },
  },
  {
    type: "select",
    value: "",
    placeholder: "请选择职位",
    prop: "role",
    label: "职位",
    rules: [{ required: true, message: "职位不能为空", trigger: "change" }],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
    attrs: {
      style: {
        width: "100%",
      },
    },
  },
  {
    type: "checkbox-group",
    value: [],
    prop: "like",
    label: "爱好",
    rules: [{ required: true, message: "爱好不能为空", trigger: "change" }],
    children: [
      {
        type: "checkbox",
        value: "1",
        label: "篮球",
      },
      {
        type: "checkbox",
        value: "2",
        label: "足球",
      },
      {
        type: "checkbox",
        value: "3",
        label: "排球",
      },
    ],
  },
  {
    type: "radio-group",
    value: "",
    prop: "gender",
    label: "性别",
    rules: [{ required: true, message: "性别不能为空", trigger: "change" }],
    children: [
      {
        type: "radio",
        value: "1",
        label: "男",
      },
      {
        type: "radio",
        value: "2",
        label: "女",
      },
      {
        type: "radio",
        value: "3",
        label: "保密",
      },
    ],
  },
  {
    type: "upload",
    label: "上传",
    prop: "pic",
    rules: [{ required: true, message: "上传文件不能为空", trigger: "blur" }],
    uploadAttrs: {
      action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      multiple: true,
      limit: 3,
    },
  },
  {
    type: "editor",
    value: "",
    prop: "desc",
    label: "描述",
    placeholder: "请输入内容",
    rules: [{ required: true, message: "描述不能位空", trigger: "blur" }],
  },
];
let form = ref();

const onPreview = (val: any) => {
  console.log("onPreview------", val.file);
};
const onSuccess = (val: any) => {
  console.log("onSuccess------", val.response, val.file, val.fileList);
};
const onError = (val: any) => {
  console.log("onError------", val.err, val.file);
};
const onRemove = (val: any) => {
  console.log("onRemove------", val.file, val.fileList);
};
const onProgress = (val: any) => {
  console.log("onProgress------", val.event, val.file, val.fileList);
};
const onChange = (val: any) => {
  console.log("onChange------", val.file, val.fileList);
};
const onExceed = (val: any) => {
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.file.length
    } files this time, add up to ${
      val.file.length + val.fileList.length
    } totally`
  );
};
const beforeRemove = (val: any) => {
  return ElMessageBox.confirm(`Cancel the transfer of ${val.file.name} ?`).then(
    () => true,
    () => false
  );
};
const beforeUpload = (val: any) => {
  console.log("beforeUpload------", val.file);
};
// const httpRequest = () => {};

const submitForm = (scope: Scope) => {
  scope.form.validate((valid) => {
    if (valid) {
    } else {
      ElMessage.error("表单填写有误，请检查");
    }
  });
};

const resetForm = () => {
  form.value.resetFields();
};
</script>

<style lang="scss" scoped></style>
