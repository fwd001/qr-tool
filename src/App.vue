<template>
  <a-config-provider :locale="zhCN">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'App',
  });
</script>

<script lang="ts" setup>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<style></style>
