<template>
  <div v-if="isPc">
    <h3 class="logo">请使用移动端访问～</h3>
  </div>
  <template v-else>
    <div class="activeTouch">
      <div class="banner">:active with hack(300ms delay)</div>
      <div class="container pseudo">
        <div class="item highlight">highlight</div>
        <div class="item animation">animation</div>
      </div>
      <div class="banner">addClass & removeClass </div>
      <div class="container add">
        <div class="item touch normal" data-mtf="true">highlight</div>
        <div class="item touch anim" data-mtf="true">animation</div>
      </div>
    </div>
    <div class="disableTouch">
      <div class="banner">:active without hack(iOS disabled)</div>
      <div class="container disabled">
        <div class="item touch normal">highlight</div>
        <div class="item touch anim">animation</div>
      </div>
    </div>
  </template>
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
          fd = mtf('.add', {
            feedbackClass: 'high',
          });
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
  export default defineComponent({ name: 'MtfDelayTest' });
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  div {
    user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-callout: none;
  }
  .banner {
    background: #38f;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 18px;
    font-weight: 900;
    color: #fff;
    line-height: 40px;
  }
  .container {
    text-align: center;
  }
  .item {
    width: 160px;
    height: 80px;
    background: #699f00;
    line-height: 80px;
    font-size: 20px;
    color: #fff;
    margin: 10px auto;
  }

  .highlight:active {
    opacity: 0.6;
  }

  .animation {
    -webkit-transition: -webkit-transform 0.1s ease-in-out;
    transition: transform 0.1s ease-in-out;
  }

  .pseudo .animation:active {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }

  .add .normal.high {
    opacity: 0.6;
  }

  .add .anim {
    -webkit-transition: -webkit-transform 0.1s ease-in-out;
    transition: transform 0.1s ease-in-out;
  }

  .add .anim.high {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }

  .disabled .normal:active {
    opacity: 0.6;
  }

  .disabled .anim {
    -webkit-transition: -webkit-transform 0.1s ease-in-out;
    transition: transform 0.1s ease-in-out;
  }

  .disabled .anim:active {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
</style>
