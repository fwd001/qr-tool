<template>
  <div v-if="isPc">
    <h3 class="logo">请使用移动端访问～</h3>
  </div>
  <div v-else>
    <h3 class="logo">mtf-demo</h3>
    <router-link class="link" to="/mtf-basic">basic.page</router-link>
    <br />
    <router-link class="link" to="/mtf-cool-feedbacks">cool-feedbacks.page</router-link>
    <br />
    <router-link class="link" to="/mtf-delay-test">delay-test.page</router-link>
    <br />
    <router-link class="link" to="/mtf-sibling">sibling.page</router-link>
    <br />
    <router-link class="link" to="/mtf-demo-list">list-demo.page</router-link>
  </div>
  <br />
  <div class="link" @click="toNpm"> 🔗mtf-npm </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import { judgeEnv } from './tool';
  const [isPc] = judgeEnv();
  const toNpm = () => {
    open('https://van.xxx.work/inspect/mtf');
  };
  onMounted(() => {});
  onUnmounted(() => {});
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'MtfHome' });
</script>

<style lang="less" scoped>
  .logo {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .link {
    font-size: 32px;
    color: blue;
    text-decoration: underline;
  }
</style>
