<template>
  <div class="fixed">
    <h3
      class="no-select"
      style="padding: 20px; border-bottom: 1px solid #ccc; color: green; text-align: right"
      >详情</h3
    >
    <ul class="detail-wrapper no-select">
      <li class="touch-feekback no-select" data-mtf="true" @click="onBack"
        ><left-outlined style="color: #ccc" /><span>有反馈返回</span>
      </li>
      <li class="no-touch-feekback no-select" @click="onBack">
        <left-outlined style="color: #ccc" /> <span>无反馈返回</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { watch, onUnmounted, nextTick } from 'vue';
  import { mtf } from 'mtf';
  import type { TC } from 'mtf';
  import { judgeEnv } from '../tool';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const [isPc] = judgeEnv();
  let fd: TC;
  watch(
    isPc,
    (state) => {
      if (!state) {
        nextTick(() => {
          fd = mtf('.detail-wrapper');
        });
      } else {
        fd?.destory();
      }
    },
    { immediate: true }
  );
  const onBack = () => {
    router.push('/mtf-demo-list');
  };

  onUnmounted(() => {
    fd?.destory();
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MtfDemoDetail' });
</script>

<style lang="less" scoped>
  .fixed {
    position: fixed;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  .detail-wrapper {
    width: 100vw;
    list-style: none;
  }
  li {
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    height: 50px;
    background: #fff;
    text-align: left;
    line-height: 50px;
    font-size: 18px;
    color: #333;
    transition: all 0.2s ease-in-out;
    border-bottom: 1px solid #ccc;
  }
  li.feedback {
    background: #333;
    color: #fff;
  }
</style>
