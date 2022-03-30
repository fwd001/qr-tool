<template>
  <div v-if="isPc">
    <h3 class="logo">请使用移动端访问～</h3>
  </div>
  <div v-else class="wrapper">
    <div class="touch" data-mtf="true">A</div>
    <div class="touch" data-mtf="true">B</div>
    <div class="touch" data-mtf="true">C</div>
    <div class="touch" data-mtf="true">D</div>
  </div>
  <back></back>
</template>

<script lang="ts" setup>
  import { nextTick, watch, onUnmounted } from 'vue';
  import { mtf } from 'mtf';
  import type { TC } from 'mtf';
  import Back from './components/back.vue';
  import { judgeEnv } from './tool';
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
  export default defineComponent({ name: 'MtfSibling' });
</script>

<style lang="less" scoped>
  .wrapper {
    padding: 30px;
    border: 1px solid #999;
    background: #ccc;
  }
  .touch {
    height: 100px;
    background: #699f00;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    margin-top: 5px;
    color: #fff;
    /*-webkit-transition: all .2s ease-in-out;
            transition: all .2s ease-in-out;*/
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-callout: none;
  }
  .touch.feedback {
    background: #38f;
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
</style>
