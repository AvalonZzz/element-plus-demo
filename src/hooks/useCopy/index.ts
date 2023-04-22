import { ElMessage } from "element-plus";
// 复制文本
export const useCopy = (text: string) => {
  // 创建input框
  const input = document.createElement("input");
  // 给input赋值
  input.value = text;
  // 将input添加到文档当中
  document.body.appendChild(input);
  // 选中input
  input.select();
  // 执行复制操作
  document.execCommand("Copy");
  // 删除input框
  document.body.removeChild(input);
  // 提示复制成功
  ElMessage.success("复制成功");
};
