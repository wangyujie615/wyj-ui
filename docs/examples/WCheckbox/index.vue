<template>
  <div class="basic">
    <h3>基础用法</h3>
    <div class="checkbox-group">
      <WCheckbox v-model="checked1">选项1</WCheckbox>
      <WCheckbox v-model="checked2" label="选项2">选项2</WCheckbox>
    </div>
  </div>

  <div class="disabled">
    <h3>禁用状态</h3>
    <div class="checkbox-group">
      <WCheckbox v-model="checked3" disabled>禁用复选框</WCheckbox>
    </div>
  </div>

  <div class="indeterminate">
    <h3>半选状态</h3>
    <div class="checkbox-group">
      <WCheckbox v-model="checked4" :indeterminate="true">半选状态</WCheckbox>
    </div>
  </div>

  <div class="events">
    <h3>事件监听</h3>
    <div class="checkbox-group">
      <WCheckbox v-model="checked5" @change="handleChange">带事件监听</WCheckbox>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础用法
const checked1 = ref(false)
const checked2 = ref(true)

// 禁用状态
const checked3 = ref(false)

// 半选状态
const checked4 = ref(false)

// 事件监听
const checked5 = ref(false)

const handleChange = (value) => {
  console.log('复选框状态改变:', value)
}
</script>

<style lang="scss" scoped>
.basic,
.disabled,
.indeterminate,
.events {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 10px;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>