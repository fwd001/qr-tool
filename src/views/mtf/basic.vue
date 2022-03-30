<!--
 * @Author: wedong.fu
 * @Date: 2022-03-01 11:31:11
 * @LastEditors: wedong.fu
 * @LastEditTime: 2022-03-30 17:31:35
 * @Description: 请填写简介
-->
<template>
  <div v-if="isPc">
    <h3 class="logo">请使用移动端访问～</h3>
  </div>
  <div v-else class="wrapper">
    <div class="touch" data-mtf="true">touch me</div>
  </div>
  <back></back>
</template>

<script lang="ts" setup>
  import { watch, onUnmounted, nextTick } from 'vue';
  import { mtf } from 'mtf';
  import type { TC } from 'mtf';
  import { judgeEnv } from './tool';
  import Back from './components/back.vue';
  const [isPc] = judgeEnv();
  let fd: TC;
  watch(
    isPc,
    (state) => {
      if (!state) {
        nextTick(() => {
          fd = mtf('.wrapper');
        });
      } else {
        fd?.destory();
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    fd?.destory();
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MtfBasic' });
</script>

<style lang="less" scoped>
  .touch {
    height: 100px;
    background: #699f00;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    color: #fff;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }
  .touch.feedback {
    background: #38f;
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
</style>
