<template>
  <a-modal :visible="props.visible" title="扫描二维码" :width="600" @cancel="handleCancel">
    <div class="cvsele-box">
      <canvas ref="cvsele" class="canvas"></canvas>
    </div>
    <template #footer>
      <a-button key="submit" type="primary" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { watch, ref, onMounted, reactive, onUnmounted, computed, nextTick } from 'vue';
  import jsQR from 'jsqr';

  interface Props {
    visible?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
  });
  let timer: number;
  let isAnimation = false;
  let video: any;
  let cvsele = ref();
  let cas: any = null;
  watch(
    () => props.visible,
    (nv) => {
      if (nv) {
        nextTick(() => {
          casInit();
          media();
        });
      }
    }
  );
  const emit = defineEmits(['update:visible', 'on-success']);

  // modal 取消事件
  const handleCancel = () => {
    cance();
    emit('update:visible', false);
  };
  // 取消扫码
  const cance = () => {
    isAnimation = false;
    cancelAnimationFrame(timer);
    video?.srcObject?.getTracks().forEach((track: any) => track?.stop());
  };
  // 绘制识别边框
  const draw = (begin: any, end: any) => {
    cas.beginPath();
    cas.moveTo(begin.x, begin.y);
    cas.lineTo(end.x, end.y);
    cas.lineWidth = 3;
    cas.strokeStyle = 'red';
    cas.stroke();
  };
  // 扫描
  const sweep = () => {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const { videoWidth, videoHeight } = video;
      cvsele.value.width = videoWidth;
      cvsele.value.height = videoHeight;
      cas.drawImage(video, 0, 0, videoWidth, videoHeight);
      try {
        const img = cas.getImageData(0, 0, videoWidth, videoHeight);

        const obj = jsQR(img.data, img.width, img.height, {
          inversionAttempts: 'dontInvert',
        });
        if (obj) {
          const loc = obj.location;
          draw(loc.topLeftCorner, loc.topRightCorner);
          draw(loc.topRightCorner, loc.bottomRightCorner);
          draw(loc.bottomRightCorner, loc.bottomLeftCorner);
          draw(loc.bottomLeftCorner, loc.topLeftCorner);
          handleCancel();
          emit('on-success', {
            img: img,
            qrInfo: obj.data,
          });
        } else {
          console.error('识别失败，请检查二维码是否正确！');
        }
      } catch (err) {
        console.error('识别失败，请检查二维码是否正确！', err);
      }
    }
    if (isAnimation) {
      timer = requestAnimationFrame(() => sweep());
    }
  };
  // 视频初始化
  const videoInit = (stream: any) => {
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.setAttribute('webkit-playsinline', true);
    video.addEventListener('loadedmetadata', () => {
      video.play();
      sweep();
    });
  };
  // 打开视频
  const media = () => {
    if (isAnimation) return;
    isAnimation = true;

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment' },
        })
        .then(videoInit)
        .catch((error) => {
          handleCancel();
          alert('对不起：未识别到扫描设备!');
          console.log(error.code + '：' + error.name + '，' + error.message);
        });
    } else if (navigator?.getUserMedia) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      navigator.getUserMedia?.(
        {
          video: { facingMode: 'environment' },
        },
        videoInit,
        (error: any) => {
          handleCancel();
          alert('对不起：未识别到扫描设备!');
          console.log(error.code + '：' + error.name + '，' + error.message);
        }
      );
    } else {
      if (
        navigator.userAgent.toLowerCase().match(/chrome/) &&
        location.origin.indexOf('https://') < 0
      ) {
        console.log(
          '获取浏览器录音功能，因安全性问题，需要在localhost 或 127.0.0.1 或 https 下才能获取权限！'
        );
      } else {
        handleCancel();
        alert('对不起：未识别到扫描设备!');
      }
    }
  };
  // canvas 初始化
  const casInit = () => {
    video = document.createElement('video');
    cas = cvsele.value.getContext('2d');
  };
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'ScanForm' });
</script>

<style lang="less" scoped>
  .cvsele-box {
    position: relative;
    display: flex;
    justify-content: center;
    background-color: #f1f1f1;
  }
  .canvas {
    box-sizing: border-box;
    width: 100%;
  }
</style>
