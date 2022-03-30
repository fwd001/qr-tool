import { createStore, Store } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';
import app from './modules/app';
import home from './modules/home';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const store: Store<any> = createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    home,
  },
  plugins: [
    //vuex 持久化存储
    createPersistedstate({
      //持久化存储 loacalStorage key
      key: 'vuex-store',
      //持久化存储 模块的值
      paths: ['home.historyList'],
    }),
  ],
});
