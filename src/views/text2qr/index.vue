<template>
  <div class="home-wrap">
    <a-row :gutter="[16, 16]">
      <a-col class="history" :xs="24" :sm="12" :lg="8">
        <div style="background-color: #fff" class="list-title"><pushpin-outlined />列表</div>
        <div style="background-color: #fff" class="list">
          <a-row v-for="item in historyList" :key="item.content" class="" :gutter="[0, 0]">
            <a-col class="content" :span="22" @click="fnToEdit(item.content)">
              <div class="item" :title="item.content">
                <span style="display: block; width: 100%" class="text-overflow">{{
                  item.content
                }}</span>

                <div class="sub-item">{{ item.date }}</div>
              </div>
            </a-col>
            <a-col style="text-align: right" :span="2">
              <a-popconfirm
                title="你确定要删除这条固定?"
                ok-text="是"
                cancel-text="否"
                @confirm="fnDel(item)"
              >
                <a title="移除" style="width: 100%; display: block; text-align: center"
                  ><delete-outlined />
                </a>
              </a-popconfirm>
            </a-col>
          </a-row>
        </div>
      </a-col>
      <a-col class="left fx" :xs="24" :sm="12" :lg="8">
        <div style="margin-bottom: 8px">
          <a-button size="small" type="primary" style="margin-right: 12px" @click="fnPin">
            <template #icon>
              <pushpin-outlined />
            </template>
          </a-button>
          <a-button size="small" type="primary" style="margin-right: 12px" @click="fnWxMiniParams">
            <template #icon>
              <wechat-outlined />
            </template>
            参数</a-button
          >
          <a-button size="small" style="margin-right: 12px" @click="fnClear">
            <template #icon>
              <clear-outlined />
            </template>
          </a-button>
          <a-button size="small" style="margin-right: 0px" @click="fnLog">log</a-button>
        </div>
        <a-textarea
          v-model:value="value"
          class="textarea"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          show-count
          :max-length="1000"
          placeholder="文本、链接"
        />
      </a-col>
      <a-col class="fx" :xs="24" :sm="12" :lg="8">
        <div ref="qrcodeWrap" style="width: 100%">
          <qr-code id="canvasDom" :value="value" :size="size" />
        </div>
      </a-col>
    </a-row>
  </div>
  <wx-params-form v-model:visible="wxVisible" :form="defaultForm" @on-ok="onWxParamsOk" />
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
  import { useStore } from 'vuex';
  import QrCode from '@/components/common/QrCode.vue';
  import { debounce } from 'lodash-es';
  import dayjs from 'dayjs';
  import { message } from 'ant-design-vue';
  import { getAllUrlParams, setUrlQuery } from '@/common/index';
  import WxParamsForm from './components/wx-params.vue';
  import type { FormState } from './components/wx-params.vue';
  import { readText } from '@/views/encode/readText';

  const href = 'https://open.weixin.qq.com/sns/getexpappinfo?';

  const store = useStore();

  const historyList = computed<any[]>(() => {
    return store.state?.home?.historyList || [];
  });

  const value = ref<string>('');
  const size = ref(100);
  const qrcodeWrap = ref();
  const fnLog = () => {
    console.log(value.value);
  };
  const fnClear = () => {
    value.value = '';
  };

  const fnResize = debounce(() => setSize(), 500);
  const setSize = () => {
    size.value = qrcodeWrap.value.clientWidth;
  };

  const [onPasteClick, getPaste] = readText();
  onPasteClick((text = '') => {
    value.value = text;
  });

  const fnPin = () => {
    const val = value.value;
    if (!val) return;
    const curD = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const hl = historyList.value.filter((v) => v.content !== val);
    hl.unshift({ content: val, date: curD });
    store.commit('home/setHistoryList', hl);
  };
  const fnDel = (item: any) => {
    if (!item) return;
    const hl = historyList.value.filter((v) => v !== item);
    store.commit('home/setHistoryList', hl);
  };
  const fnWxMiniParams = () => {
    let miniTz = /\#wechat-redirect$/;
    if (!value.value) {
      defaultForm.appid = 'wx1xxxxxxxxxxx1f1c';
      defaultForm.path = 'pages/index/index.html';
      defaultForm.query = [{ key: 'key', value: 'value', _key: 0 }];
      showWxParams();
      return;
    }
    if (!miniTz.test(value.value)) {
      return message.warning('文本非微信小程序体验版链接，无法解析！');
    }
    let miniStr = value.value;
    // 小程序appid
    let appid = getAllUrlParams(miniStr).appid;
    // 小程序querystring
    let queryAllStr = decodeURIComponent(getAllUrlParams(miniStr).path);
    console.log('小程序querystring', queryAllStr);
    // 小程序路径
    let pathStr = '';
    if (!queryAllStr?.includes('?')) {
      pathStr = queryAllStr;
    } else {
      pathStr = queryAllStr.split('?')[0];
    }
    const params = getAllUrlParams(queryAllStr);
    console.log('miniStr:::', miniStr);
    console.log('queryAllStr:::', queryAllStr);
    console.log('appid:::', appid);
    console.log('pathStr:::', pathStr);
    console.log('queryStr:::', params);

    const query = [];
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const element = decodeURIComponent(params[key]);
        query.push({
          key: key,
          value: decodeURIComponent(element),
        });
      }
    }
    defaultForm.appid = appid;
    defaultForm.path = pathStr;
    defaultForm.query = query.map((v, index) => ({ ...v, _key: index }));
    showWxParams();
  };
  const fnToEdit = (content: string) => {
    if (!content) return;
    value.value = content;
  };

  const wxVisible = ref(false);
  const defaultForm = reactive<FormState>({
    appid: '',
    path: '',
    query: [],
  });
  const showWxParams = () => {
    wxVisible.value = true;
  };
  const onWxParamsOk = (form: FormState) => {
    let miniStr = value.value || href;
    let url = miniStr.split('?')[0];
    let queryStr = setUrlQuery({ url: form.path, query: form.query });
    url = url + `?appid=${form.appid}`;
    url = url + `&path=${encodeURIComponent(queryStr)}`;
    url = url + `#wechat-redirect`;
    value.value = url;
  };

  onMounted(() => {
    setSize();
    window.addEventListener('resize', fnResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', fnResize);
  });
</script>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  export default defineComponent({ name: 'HomePage' });
</script>

<style lang="less" scoped>
  .home-wrap {
    background-color: #f1f1f1;
    padding: 16px;
    box-sizing: border-box;
  }
  .history {
    .list {
      max-height: 300px;
      min-height: 88px;
      overflow-y: auto;
      padding-left: 8px;
      padding-right: 8px;
    }
    .list-title {
      background-color: #fff;
      padding: 8px;
    }
    .item {
      cursor: pointer;
    }
    .sub-item {
      font-size: 12px;
      color: #ccc;
      white-space: nowrap;
    }
  }
  .left {
    flex-direction: column;
    align-items: flex-end;
    .textarea {
      width: 100%;
    }
  }
</style>
