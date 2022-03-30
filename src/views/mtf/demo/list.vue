<template>
  <div class="fixed">
    <h3 class="no-select" style="padding: 20px; border-bottom: 1px solid #ccc">列表</h3>
    <ul class="list-wrapper">
      <li class="touch-feekback no-select" @click="toDetail" data-mtf="true"
        ><span>有反馈跳转详情</span>
        <right-outlined style="color: #ccc" />
      </li>
      <li class="no-touch-feekback no-select" @click="toDetail"
        ><span>无反馈跳转详情</span> <right-outlined style="color: #ccc"
      /></li>
    </ul>
    <back></back>
  </div>
</template>

<script lang="ts" setup>
  import { watch, onUnmounted, nextTick } from 'vue';
  import { mtf } from 'mtf';
  import type { TC } from 'mtf';
  import { judgeEnv } from '../tool';
  import { useRouter } from 'vue-router';
  import Back from '../components/back.vue';

  const router = useRouter();
  const [isPc] = judgeEnv();
  let fd: TC;
  watch(
    isPc,
    (state) => {
      if (!state) {
        nextTick(() => {
          fd = mtf('.list-wrapper');
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
  const toDetail = () => {
    router.push('/mtf-demo-list-detail');
  };
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MtfDemoList' });
</script>

<style lang="less" scoped>
  .fixed {
    position: fixed;
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  .list-wrapper {
    list-style: none;
    width: 100vw;
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
    background: green;
    color: #fff;
  }
</style>
