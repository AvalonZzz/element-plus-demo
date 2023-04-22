type tagType = "" | "success" | "warn" | "info" | "danger";
export interface ListItem {
  // 头像
  avatar?: string;
  // 标题
  title?: string;
  // 描述
  desc?: string;
  // 时间
  time?: string;
  // 标签内容
  tag?: string;
  tagType?: tagType;
}

export interface ListOptions {
  title: string;
  content: ListItem[];
}

export interface ActionOptions {
  text: string;
  icon?: string;
}
