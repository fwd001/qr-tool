<!--
 * @Author: wedong.fu
 * @Date: 2022-03-01 11:31:11
 * @LastEditors: wedong.fu
 * @LastEditTime: 2022-03-30 17:32:42
 * @Description: 请填写简介
-->
<template>
  <div class="link" @click="fnBack"> back </div>
  <div class="link" @click="toNpm"> 🔗mtf-npm </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const fnBack = () => {
    router.push({ path: '/mtf' });
  };
  const toNpm = () => {
    open('https://van.xxx.work/inspect/mtf');
  };
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MtfBack' });
</script>

<style lang="less" scoped>
  .link {
    padding: 10px;
    text-align: center;
    font-size: 24px;
    color: blue;
    text-decoration: underline;
  }
</style>
