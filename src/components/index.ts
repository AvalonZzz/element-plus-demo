import { App } from "vue";
import chooseIcon from "./chooseIcon/index";
import chooseArea from "./chooseArea/index";
import trend from "./trend/index";
import notification from "./notification/index";
import list from "./list/index";
import menu from "./menu/index";
import progress from "./progress/index";
import chooseTime from "./chooseTime/index";
import chooseDate from "./chooseDate/index";
import chooseCity from "./chooseCity/index";
import table from "./table/index";

const components = [
  chooseArea,
  chooseIcon,
  trend,
  notification,
  list,
  menu,
  progress,
  chooseTime,
  chooseDate,
  chooseCity,
  table,
];

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item);
    });
  },
};
