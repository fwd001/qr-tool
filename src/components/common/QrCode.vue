<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'QrCode' });
</script>

<template>
  <a-spin :spinning="!isRefresh">
    <div class="qrcode-wrap" :style="`width: ${props.size}px; height: ${props.size}px;`">
      <template v-if="isRefresh && qrStr">
        <qrcode-vue :value="qrStr" :size="props.size" level="H" background="#ffffff" />
      </template>
      <span v-else>二维码预览</span>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
  import { debounce } from 'lodash-es';
  import QrcodeVue from 'qrcode.vue';
  import { watch, ref } from 'vue';

  interface Props {
    value?: string;
    size?: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    size: 100,
  });

  const qrStr = ref(props.value);
  const isRefresh = ref(true);
  watch(
    () => props.value,
    (nv) => refresh(nv)
  );

  const refresh = debounce((nv) => {
    isRefresh.value = false;
    setTimeout(() => {
      isRefresh.value = true;
      qrStr.value = nv;
    }, 150);
  }, 500);
</script>

<style lang="less" scoped>
  .qrcode-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
</style>
