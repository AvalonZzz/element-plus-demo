<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane
        v-for="(item, index) in lists"
        :key="index"
        :label="item.title"
      >
        <el-scrollbar max-height="300px">
          <div
            class="container"
            v-for="(listItem, listIndex) in item.content"
            :key="listIndex"
            @click="handleClickItem(listItem, listIndex)"
          >
            <div class="avatar" v-if="listItem.avatar">
              <el-avatar size="small" :src="listItem.avatar"></el-avatar>
            </div>
            <div class="content">
              <div class="title" v-if="listItem.title">
                {{ listItem.title }}
                <el-tag
                  size="mini"
                  :type="listItem.tagType"
                  v-if="listItem.tag"
                  >{{ listItem.tag }}</el-tag
                >
              </div>
              <div class="desc" v-if="listItem.desc">{{ listItem.desc }}</div>
              <div class="time" v-if="listItem.time">{{ listItem.time }}</div>
            </div>
          </div>
          <div class="actions">
            <div
              class="a-item"
              :class="{ border: index !== actions.length }"
              v-for="(item, index) in actions"
              :key="index"
              @click="handleClickAction(item, index)"
            >
              <div class="a-icon" v-if="item.icon">
                <component :is="`el-icon-${toLine(item.icon)}`"></component>
              </div>
              <div class="a-text">{{ item.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { ActionOptions, ListOptions, ListItem } from "./type";
import { toLine } from "@/utils";
const props = defineProps({
  lists: {
    type: Array as PropType<ListOptions[]>,
    require: true,
  },
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
});

const emits = defineEmits(["clickItem", "clickAction"]);
const handleClickItem = (item: ListItem, index: number) => {
  emits("clickItem", { item, index });
};
const handleClickAction = (item: ActionOptions, index: number) => {
  emits("clickAction", { item, index });
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background-color: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    height: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>
