<template>
  <a-row class="qr2text-wrap" :gutter="[16, 16]">
    <a-col class="tool" :xs="24" :sm="12" :lg="8">
      <a-button type="primary" size="small" style="margin-right: 12px" @click="openScan">
        <template #icon>
          <scan-outlined />
        </template>
      </a-button>

      <a-upload
        accept="image/*"
        :before-upload="beforeUpload"
        :show-upload-list="false"
        :multiple="false"
      >
        <a-button type="primary" size="small" style="margin-right: 12px">
          <template #icon>
            <cloud-upload-outlined />
          </template>
        </a-button>
      </a-upload>
      <a-button size="small" class="copy-link" data-clipboard-target="#target-text">
        <template #icon>
          <copy-outlined />
        </template>
      </a-button>
    </a-col>
    <a-col class="left fx" :xs="24" :sm="12" :lg="8">
      <span class="result-box relative">
        <span :class="[{ 'copy-animation': isCopy }]"></span>
        <span id="target-text" class="target-text" style="width: 100%"> {{ result }}</span>
      </span>
    </a-col>
    <a-col class="right fx" :xs="24" :sm="12" :lg="8">
      <div class="imgurl">
        <a-image
          :width="230"
          :src="imgurl"
          fallback="data:image/png;base64,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"
        />
      </div>
    </a-col>
  </a-row>
  <scan-form v-model:visible="scanVisible" @on-success="fnscanSuccess" />
  <canvas
    ref="qrcanvas"
    :width="cWidth"
    :height="cHeight"
    style="display: none; background-color: #ccc"
  ></canvas>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
  import jsQR from 'jsqr';
  import toneMp3 from '@/assets/tone.mp3';
  import ScanForm from './components/scanForm.vue';
  import { imagedata_to_image } from '@/common/index';
  import type { UploadProps } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import Clipboard from 'clipboard';

  const scanVisible = ref(false);
  let isAnimation = false;
  let timer: number;
  let copyAnimTimer: any;
  let count = 0;
  const result = ref('');
  const imgurl = ref('');
  const qrcanvas = ref();
  const cWidth = ref(0);
  const cHeight = ref(0);
  const isCopy = ref(false);

  let audio: any = null;
  var fReader = new FileReader();
  fReader.onload = async (event: any) => {
    // event.target.result就是图片的Base64地址啦
    const base64Data = event?.target?.result || null;
    if (!base64Data) return;
    imgurl.value = base64Data;
    base64ToText(base64Data);
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    fReader.readAsDataURL(file);
    return false;
  };

  // 取消扫码
  const cance = () => {
    count = 0;
    isAnimation = false;
    cancelAnimationFrame(timer);
  };

  // 扫描成功回掉
  const fnscanSuccess = (data: any) => {
    imgurl.value = imagedata_to_image(data.img);
    if (result.value != data.qrInfo) {
      console.info('识别结果：', data.qrInfo);
      audio.play();
      result.value = data.qrInfo;
    }
  };
  const openScan = () => {
    scanVisible.value = true;
  };
  // 粘贴回掉函数
  const pasteCallback = (event: ClipboardEvent) => {
    var items = event.clipboardData && event.clipboardData.items;
    var file = null;
    if (items && items.length) {
      // 检索剪切板items
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    // 此时file就是剪切板中的图片文件
    if (file) {
      fReader.readAsDataURL(file);
    }
  };

  const base64ToText = (base64Data: string): any => {
    var ctx = qrcanvas.value.getContext('2d');
    var image = new Image();
    image.src = base64Data;
    image.onload = function () {
      isAnimation = true;
      sweep(ctx, image);
    };
  };
  // 拷贝动画
  const copyAnim = () => {
    isCopy.value = true;
    clearTimeout(copyAnimTimer);
    copyAnimTimer = setTimeout(() => {
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

  let clipboard: any = null;
  const clipboardInit = () => {
    clipboard = new Clipboard('.copy-link');
    clipboard.on('success', copySuc);
    clipboard.on('error', copyErr);
  };
  const clipboardUninstall = () => {
    clipboard?.destroy();
  };

  // 扫描
  const sweep = (ctx: any, image: any) => {
    const width = image.width;
    const height = image.height;
    cWidth.value = width;
    cHeight.value = height;
    ctx.drawImage(image, 0, 0, width, height);
    const img = ctx.getImageData(0, 0, width, height);
    try {
      const obj = jsQR(img.data, img.width, img.height, {
        inversionAttempts: 'dontInvert',
      });
      if (obj) {
        const text = obj?.data || '';
        if (result.value !== text) {
          console.info('识别结果：', text);
          audio.play();
        }
        result.value = text;
        cance();
      }
    } catch (err) {
      console.error('识别失败，请检查二维码是否正确！', err);
    }
    if (isAnimation) {
      if (count === 10) {
        result.value = '二维码识别错误！';
        return cance();
      }
      count += 1;
      timer = requestAnimationFrame(() => sweep(ctx, image));
    }
  };
  onMounted(() => {
    audio = new Audio(toneMp3);
    document.addEventListener('paste', pasteCallback);
    clipboardUninstall();
    clipboardInit();
  });
  onUnmounted(() => {
    document.removeEventListener('paste', pasteCallback);
    clipboardUninstall();
  });
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'Qr2Text' });
</script>
<style>
  :root {
    --copy-animation-width: 700px;
  }
</style>

<style lang="less" scoped>
  .qr2text-wrap {
    background-color: #f1f1f1;
    padding: 16px;
    box-sizing: border-box;
  }
  .tool {
    display: flex;
    justify-content: flex-end;
  }
  .imgurl {
    text-align: center;
    width: 100%;
    min-height: 230px;
    border: 1px dashed gray;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .result-box {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    min-height: 100px;
    border: 1px solid gray;
    font-size: 16px;
    word-break: break-all;
    background-color: #fff;
    overflow: hidden;
  }
</style>
