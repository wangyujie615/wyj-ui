<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
    <WButton>默认按钮</WButton>
    <WButton type="primary">主要按钮</WButton>
    <WButton type="success">成功按钮</WButton>
    <WButton type="warning">警告按钮</WButton>
    <WButton type="danger">危险按钮</WButton>
    <WButton type="info">信息按钮</WButton>
    <WButton type="link">链接按钮</WButton>
    <WButton type="text">文字按钮</WButton>
  </div>
</template>
<script setup lang="ts">
const handleClick = () => {
  console.log('click');
};
</script>