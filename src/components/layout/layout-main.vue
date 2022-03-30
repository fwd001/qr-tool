<!--
 * @Author: wedong.fu
 * @Date: 2022-03-01 11:31:11
 * @LastEditors: wedong.fu
 * @LastEditTime: 2022-03-30 17:32:39
 * @Description: 请填写简介
-->
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'LayoutPage' });
</script>

<template>
  <a-row class="layout-page-wrap">
    <a-space size="middle">
      <a-col class="logo">qr-tool</a-col>
      <a-col class="link"><router-link to="/text2qr">text2qr</router-link></a-col>
      <a-col class="link"><router-link to="/qr2text">qr2text</router-link></a-col>
      <a-col class="link"><router-link to="/encode">解码/编码</router-link></a-col>
      <a-col class="link" @click="toDoc()">文档</a-col>
    </a-space>
  </a-row>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <div class="advertising-space"> <span>广告位招租</span> </div>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const toView = (url?: string) => {
    if (!url) return message.warning('未开发！');
    router.push({
      path: url,
    });
  };
  const toDoc = () => {
    window.open('https://xxx.feishu.cn/docs/doccnJtzxE1K80J5p6XvLy71UPh#');
  };
</script>

<style lang="less" scoped>
  .layout-page-wrap {
    height: 44px;
    line-height: 44px;
  }
  .logo {
    background-color: #f1f1f1;
    color: #ccc;
    padding-left: 8px;
    padding-right: 8px;
  }
  .link {
    color: #4190f7;
    cursor: pointer;
  }
  .advertising-space {
    background-color: #ccc;
    color: #fff;
    font-size: 50px;
    text-align: center;
    user-select: none;
  }
</style>
