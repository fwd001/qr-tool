<template>
  <a-row class="encode-wrap" :gutter="[16, 16]">
    <a-col class="source-text-wrap" :xs="24" :sm="12" :lg="8">
      <a-row :gutter="[0, 16]">
        <a-col :xs="24">
          <a-textarea v-model:value="sourceText" placeholder="文本" allow-clear :rows="4" />
        </a-col>
        <a-col :xs="24">
          <a-row :gutter="[8, 8]" style="width: 100%" type="flex" justify="start">
            <a-col>加密：</a-col>
            <a-col>
              <a-button size="small" type="primary" @click="fnEncode"> url编码 </a-button>
            </a-col>
          </a-row>
        </a-col>
        <a-col :xs="24">
          <a-row :gutter="[8, 8]" style="width: 100%" type="flex" justify="start">
            <a-col>解密：</a-col>
            <a-col>
              <a-button size="small" type="primary" @click="fnDecode"> url解码 </a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>
    <a-col class="target-text-wrap" :xs="24" :sm="12" :lg="8">
      <a-row :gutter="[8, 8]">
        <a-col>
          <a-button size="small" type="primary" @click="fnChange">
            <template #icon>
              <swap-outlined />
            </template>
          </a-button>
        </a-col>
        <a-col>
          <a-button
            size="small"
            type="primary"
            class="copy-link"
            data-clipboard-target="#target-text"
          >
            <template #icon>
              <copy-outlined />
            </template>
          </a-button>
        </a-col>
        <a-col>
          <a-button size="small" type="primary" @click="onPasteClcik"> 一键粘贴 </a-button>
        </a-col>
        <a-col v-if="predictDe !== targetText">
          <a-tooltip>
            <template #title>继续解码</template>
            <a-button size="small" type="primary" @click="fnReDecode">
              <template #icon>
                <thunderbolt-outlined />
              </template>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col class="target-text-box relative" :span="24">
          <span :class="[{ 'copy-animation': isCopy }]"></span>
          <span id="target-text" class="target-text" style="width: 100%"> {{ targetText }}</span>
        </a-col>
      </a-row>
    </a-col>
    <a-col class="right fx" :xs="24" :sm="12" :lg="8"></a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import Clipboard from 'clipboard';
  import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { readText } from '@/views/encode/readText';

  const sourceText = ref('');
  const targetText = ref('');
  const isCopy = ref(false);

  const predictDe = ref('');

  let timer: any = null;
  // 拷贝动画
  const copyAnim = () => {
    isCopy.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCopy.value = false;
    }, 500);
  };

  const copySuc = (e: any) => {
    message.success('复制成功 🎉', 0.7);
    copyAnim();
    e.clearSelection();
  };
  const copyErr = (e: any) => {
    message.warning('复制失败 ～', 1);
  };
  const [onPasteClick, getPaste] = readText();

  onPasteClick((text = '') => {
    sourceText.value = text;
  });
  const onPasteClcik = async () => {
    try {
      sourceText.value = (await getPaste()) as unknown as string;
    } catch (error) {
      console.log(error);
    }
  };

  let clipboard: any = null;
  const clipboardInit = () => {
    clipboard = new Clipboard('.copy-link');
    clipboard.on('success', copySuc);
    clipboard.on('error', copyErr);
  };
  const clipboardUninstall = () => {
    clipboard?.destroy();
  };
  const fnEncode = () => {
    try {
      targetText.value = encodeURIComponent(sourceText.value);
    } catch (error) {
      targetText.value = '编码错误';
    }
  };
  const fnDecode = () => {
    try {
      targetText.value = decodeURIComponent(sourceText.value);
      predictDe.value = decodeURIComponent(targetText.value);
    } catch (error) {
      targetText.value = '解码错误';
    }
  };

  const fnReDecode = () => {
    try {
      targetText.value = decodeURIComponent(targetText.value);
      predictDe.value = decodeURIComponent(targetText.value);
    } catch (error) {
      targetText.value = '解码错误';
    }
  };

  const fnChange = () => {
    let tep = '';
    tep = targetText.value;
    targetText.value = sourceText.value;
    sourceText.value = tep;
  };
  onMounted(() => {
    console.log('onMounted');
    clipboardUninstall();
    clipboardInit();
  });
  onUnmounted(() => {
    clipboardUninstall();
    console.log('onUnmounted');
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'EncodePage' });
</script>
<style>
  :root {
    --copy-animation-width: 700px;
  }
</style>

<style lang="less" scoped>
  .encode-wrap {
    padding: 16px;
    background-color: #f1f1f1;
  }
  .target-text-wrap {
    .target-text-box {
      overflow: hidden;
    }
    .target-text {
      display: block;
      width: 100%;
      min-height: 66px;
      word-wrap: break-word;
      background-color: #fff;
    }
  }
</style>
