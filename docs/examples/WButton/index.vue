<template>
  <div class="type">
    <WButton type="primary">primary</WButton>
    <WButton type="default">default</WButton>
    <WButton type="info">info</WButton>
    <WButton type="success">success</WButton>
    <WButton type="warning">warning</WButton>
    <WButton type="danger">danger</WButton>
    <WButton type="text">text</WButton>
    <WButton type="link">link</WButton>
  </div>
  <div class="size">
    <WButton type="primary" size="small">primary</WButton>
    <WButton type="primary" size="medium">primary</WButton>
    <WButton type="primary" size="large">primary</WButton>
  </div>
  <div class="round">
    <WButton type="primary" round>primary</WButton>
    <WButton type="primary" size="small" round>primary</WButton>
  </div>
</template>

<script setup>
// 确保组件路径正确

</script>
<style lang="sass">

.type
  display: flex
  flex-wrap: wrap
  gap: 5px

.size
  display: flex
  gap: 5px
  margin-top: 10px
  align-items: center

.round
  display: flex
  gap: 5px
  margin-top: 10px
  align-items: center
</style>