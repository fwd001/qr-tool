/* eslint-disable @typescript-eslint/no-explicit-any */
import { Module } from 'vuex';
import {} from '@/common';
import {} from '@/api/common';

// export type IUser = Record<'account' | 'userName', any>;

export interface AppState {
  name: '';
}

// Module这个类型可以传两个范型变量 第一个是当前模块state的对象接口类型 第二个是主仓库state的对象接口类型
const AppStore: Module<AppState, unknown> = {
  namespaced: true,
  state: {
    name: '',
  },
  getters: {},
  mutations: {
    setNmae(state, data) {
      state.name = data;
    },
  },
  actions: {},
};

export default AppStore;
