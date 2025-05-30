<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
</script>

<template>
  <WIcon :color="'red'" :size="20">
    <AddCircle></AddCircle>
  </WIcon>
  <!-- 在使用树组件时 会传递一个树形结构 -->
  <WTree></WTree>
  <WButton type="primary" size="small" native-type="button">按钮</WButton>
</template>

<style scoped></style>
