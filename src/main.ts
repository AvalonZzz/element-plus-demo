import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as Icons from "@element-plus/icons-vue";
import { toLine } from "./utils/index";
import mUI from "./components/index";
import "./mock";

const app = createApp(App);

for (let i in Icons) {
  // console.log((Icons as any)[i]);
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i]);
}

app.use(router).use(ElementPlus).use(mUI);
app.mount("#app");
