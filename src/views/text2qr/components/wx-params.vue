<template>
  <a-modal
    :visible="props.visible"
    title="微信小程序预览版参数编辑"
    :width="600"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 17 }"
    >
      <a-form-item ref="appid" label="appid" name="appid">
        <a-input v-model:value="formState.appid" />
      </a-form-item>
      <a-form-item ref="path" label="path" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item
        v-for="(item, index) in formState.query"
        :key="item._key"
        v-bind="
          index === 0
            ? { labelCol: { span: 4 }, wrapperCol: { span: 20 } }
            : { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } } }
        "
        :label="index === 0 ? 'query' : ''"
        :name="`query.${index}`"
        :rules="{}"
      >
        <key-value v-model:value="formState.query[index]" />
        <MinusCircleOutlined
          v-if="formState.query.length > 1"
          class="dynamic-delete-button"
          :disabled="formState.query.length === 1"
          @click="removeDomain(item)"
        />
      </a-form-item>
      <a-form-item v-bind="{ wrapperCol: { span: 20, offset: 4 } }">
        <a-button type="dashed" style="width: 60%" @click="addDomain">
          <PlusOutlined />
          Add query
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { watch, ref, onMounted, reactive, onUnmounted, computed, toRaw } from 'vue';
  import type { UnwrapRef } from 'vue';
  import { Dayjs } from 'dayjs';
  import KeyValue from './key-value.vue';
  const formRef = ref();
  export interface FormState {
    appid: string;
    path: string;
    query: any[];
  }
  interface Props {
    visible?: boolean;
    form?: FormState;
  }
  const formState: UnwrapRef<FormState> = reactive({
    appid: '',
    path: '',
    query: [],
  });

  interface QueryItem {
    key: string;
    value: string;
    _key: string;
  }
  const rules = {
    appid: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
    path: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
  };
  const props = withDefaults(defineProps<Props>(), {
    visible: false,
    form: () => ({
      appid: '',
      path: '',
      query: [],
    }),
  });
  watch(
    () => props.visible,
    (nv) => {
      if (nv) {
        formState.appid = props.form.appid;
        formState.path = props.form.path;
        formState.query = props.form.query;
      }
    }
  );
  const emit = defineEmits(['update:visible', 'onOk']);

  const handleOk = () => {
    formRef.value
      .validate()
      .then(() => {
        emit('onOk', toRaw(formState));
        handleCancel();
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };
  const handleCancel = () => {
    resetFields();
    emit('update:visible', false);
  };
  const resetFields = () => {
    formRef.value.resetFields();
  };
  const removeDomain = (item: QueryItem) => {
    let index = formState.query.findIndex((v) => v._key === item._key);
    if (index !== -1) {
      formState.query.splice(index, 1);
    }
  };
  const addDomain = () => {
    formState.query.push({
      value: '',
      key: '',
      _key: Date.now(),
    });
  };

  onMounted(() => {});
  onUnmounted(() => {});
</script>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({ name: 'WxParams' });
</script>

<style lang="less" scoped>
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all 0.3s;
    margin-left: 12px;
  }
  .dynamic-delete-button:hover {
    color: #777;
  }
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
