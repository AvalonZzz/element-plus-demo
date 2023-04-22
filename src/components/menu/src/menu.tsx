import { defineComponent, PropType } from "vue";
import { MenuItem } from "./types";
import { toLine } from "@/utils";
import "./styles/index.scss";

export default defineComponent({
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<any[]>,
      required: true,
    },
    // 默认选中的菜单
    defaultActive: {
      type: String,
      default: "",
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false,
    },
    // 键名
    // 菜单标题的键名
    name: {
      type: String,
      default: "name",
    },
    // 菜单标识的键名
    index: {
      type: String,
      default: "index",
    },
    // 菜单图标的键名
    icon: {
      type: String,
      default: "icon",
    },
    // 菜单子菜单的键名
    children: {
      type: String,
      default: "children",
    },
  },

  setup(props, ctx) {
    // 封装一个渲染无线层级菜单的方法
    // 函数会返回一段jsx的代码
    let renderMenu = (data: MenuItem[]) => {
      return data.map((item) => {
        // 处理每个菜单的图标
        item.i = `el-icon-${toLine(item.icon!)}`;
        // 处理sub-menu的插槽
        let slots = {
          title: () => {
            return (
              <>
                <item.i />
                <span>{item.name}</span>
              </>
            );
          },
        };
        // 递归渲染children
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          );
        }
        // 正常渲染普通的菜单
        return (
          <el-menu-item>
            <item.i />
            <span>{item.name}</span>
          </el-menu-item>
        );
      });
    };
    return () => {
      return (
        <el-menu
          class="el-menu-vertical-demo"
          default-active={props.defaultActive}
          router={props.router}
        >
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
