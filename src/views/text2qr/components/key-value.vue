<template>
  <span>
    <a-input
      type="text"
      :value="value.key"
      placeholder="key"
      style="width: 100px; margin-right: 12px"
      @change="(e: InputEvent) => onChange(e, 'key')"
    />
    <span style="margin-right: 12px">=</span>
    <a-input
      type="text"
      :value="value.value"
      placeholder="value"
      style="width: 150px"
      @change="(e: InputEvent) => onChange(e, 'value')"
    />
    <a-button style="margin-left: 8px" size="small" @click="encode">编码</a-button>
    <a-button type="primary" style="margin-left: 8px" size="small" @click="decode">解码</a-button>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import { Form } from 'ant-design-vue';

  interface KeyValue {
    key: string;
    value: string;
    _key: string | number;
  }
  export default defineComponent({
    props: {
      value: {
        type: Object as PropType<KeyValue>,
        isRequired: true,
        default: () => ({ key: '', value: '', _key: 0 }),
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const formItemContext = Form.useInjectFormItemContext();
      const triggerChange = (changedValue: { key?: string; value?: string }) => {
        emit('update:value', { ...props.value, ...changedValue });
        formItemContext.onFieldChange();
      };
      const onChange = (e: InputEvent, key: string) => {
        const str = (e.target as any).value || '';
        triggerChange({ [key]: str });
      };
      const decode = () => {
        const deKey = decodeURIComponent(props.value.key);
        const deValue = decodeURIComponent(props.value.value);
        console.log(`${deKey}: ${deValue}`);

        triggerChange({ key: deKey, value: deValue });
      };
      const encode = () => {
        const deValue = encodeURIComponent(props.value.value);
        console.log(`value: ${deValue}`);

        triggerChange({ value: deValue });
      };

      return {
        onChange,
        decode,
        encode,
      };
    },
  });
</script>
