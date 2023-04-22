<template>
  <div style="display: flex">
    <c-menu :data="data1"></c-menu>
    <c-menu
      :data="data2"
      defaultActive="1"
      name="a"
      index="b"
      icon="c"
      children="d"
    ></c-menu>
    <infinite-menu :data="data3"></infinite-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "document",
      },
    ],
  },
];
let data2 = [
  {
    a: "导航1",
    b: "1",
    c: "Document",
  },
  {
    a: "导航2",
    b: "2",
    c: "Document",
  },
  {
    a: "导航3",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
      },
    ],
  },
];
let data3 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
        children: [
          {
            name: "导航3-1-1",
            index: "3-1-1",
            icon: "Document",
            children: [
              {
                name: "导航3-1-1-1",
                index: "3-1-1-1",
                icon: "Document",
                children: [
                  {
                    name: "导航3-1-1-1-1",
                    index: "3-1-1-1-1",
                    icon: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped></style>
