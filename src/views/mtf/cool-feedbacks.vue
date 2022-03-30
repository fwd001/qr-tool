<template>
  <h1>mtf.js</h1>
  <div v-if="isPc">
    <h3 class="logo">请使用移动端访问～</h3>
  </div>
  <div class="wrapper" v-else>
    <div class="line">
      <div class="left" data-mtf="true"><p id="test">Grow</p></div
      ><div class="right" data-mtf="true">Shrink</div>
    </div>
    <div class="line">
      <div class="left" data-mtf="true">Grow Rotate</div
      ><div class="right" data-mtf="true">skew</div>
    </div>
    <div class="line">
      <div class="left" data-mtf="true">Fade</div><div class="right" data-mtf="true">Shutter</div>
    </div>
    <div class="line">
      <div class="left" data-mtf="true">Radial Out</div
      ><div class="right" data-mtf="true">Reveal</div>
    </div>
  </div>
  <back></back>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue';
  import { useStore } from 'vuex';
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
  export default defineComponent({ name: 'MtfCoolFeedbacks' });
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  h1 {
    text-align: center;
    color: #333;
  }
  .wrapper {
    padding: 0 10px;
  }
  .line div {
    width: 46%;
    height: 16vh;
    background: #000;
    margin: 10px 2%;
    display: inline-block;
    font-size: 22px;
    color: #fff;
    line-height: 16vh;
    text-align: center;
    font-weight: 900;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-callout: none;
  }
  .line:nth-child(odd) .left {
    background: #f55;
  }
  .line:nth-child(odd) .right {
    background: #7e57c2;
  }
  .line:nth-child(even) .left {
    background: #ff9800;
  }
  .line:nth-child(even) .right {
    background: #1489e6;
  }

  .line:nth-child(1) .left.feedback {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .line:nth-child(1) .right.feedback {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  .line:nth-child(2) .left.feedback {
    -webkit-transform: scale(1.1) rotate(4deg);
    transform: scale(1.1) rotate(4deg);
  }

  .line:nth-child(2) .right.feedback {
    -webkit-transform: skew(-10deg);
    transform: skew(-10deg);
  }

  .line:nth-child(3) .left.feedback {
    background-color: #009688;
    color: #ccc;
  }

  .line:nth-child(3) .right:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #699f00;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .line:nth-child(3) .right.feedback:before {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  .line:nth-child(4) .left:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #699f00;
    border-radius: 100%;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .line:nth-child(4) .left.feedback:before {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }

  .line:nth-child(4) .right {
    background: #e1e1e1;
    color: #666;
  }

  .line:nth-child(4) .right:before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-color: #2098d1;
    border-style: solid;
    border-width: 0;
    -webkit-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  .line:nth-child(4) .right.feedback:before {
    border-width: 10px;
  }
</style>
