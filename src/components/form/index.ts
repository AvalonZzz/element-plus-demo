import { App } from "vue";
import form from "./src/index.vue";

export default {
  install(app: App) {
    app.component("c-form", form);
  },
};
