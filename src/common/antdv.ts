/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConfigProvider,
  Button,
  DatePicker,
  Dropdown,
  Menu,
  Tooltip,
  Tag,
  Cascader,
  Form,
  Select,
  SelectOption,
  Input,
  Row,
  Col,
  Popover,
  TimePicker,
  Radio,
  Modal,
  Spin,
  Popconfirm,
  Space,
} from 'ant-design-vue';
import type { App } from 'vue';
import 'ant-design-vue/es/message/style';
import 'ant-design-vue/es/modal/style';

import * as antdIcons from '@ant-design/icons-vue';
import { isValidKey } from './index';

const antdInit = (app: App) => {
  app.use(DatePicker);
  app.use(Button);
  app.use(Dropdown);
  app.use(Menu);
  app.use(Tooltip);
  app.use(Tag);
  app.use(Cascader);
  app.use(Form);
  app.use(Select);
  app.use(SelectOption);
  app.use(Input);
  app.use(Row);
  app.use(Col);
  app.use(Popover);
  app.use(ConfigProvider);
  app.use(TimePicker);
  app.use(Radio);
  app.use(Modal);
  app.use(Spin);
  app.use(Popconfirm);
  app.use(Space);
  // app.use();
  // app.use();
  // app.use();
  // app.use();
  // app.use();
};

export default {
  install: (app: App) => {
    antdInit(app);
    // 注册组件
    for (const key in antdIcons) {
      if (Object.prototype.hasOwnProperty.call(antdIcons, key)) {
        if (isValidKey(key, antdIcons)) {
          const element = antdIcons[key];
          app.component(key, element);
        }
      }
    }
    // 添加到全局
    app.config.globalProperties.$antdIcons = antdIcons;
  },
};
