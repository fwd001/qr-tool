import { resolve } from 'path'; // 此处如果报错则安装 node/path依赖
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import legacy from '@vitejs/plugin-legacy';
// 代理环境配置
import { dev } from './src/config/dev-env.js';

export default defineConfig({
  root: './',
  base: './',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  server: {
    port: 8888,
    host: '0.0.0.0',
    proxy: {
      // '/ebms': {
      //   target: dev.originApiUrl,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/\/ebms/, ''),
      // },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: antdvVars,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    target: 'esnext',
    //指定打包输出路径
    outDir: 'dist',
    //指定静态资源存放路径
    assetsDir: 'assets',
    //css代码拆分,禁用则所有样式保存在一个css里面
    cssCodeSplit: true,
    // 默认: 4096（4kb）
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    assetsInlineLimit: 6144,
    sourcemap: true,
    terserOptions: {
      // 生产环境移除console
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    },
    // chunk大小警告的限制，以kbs为单位
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // 分割打包
        manualChunks(id) {
          if (id.includes('node_modules') && (id.includes('/@vue') || id.includes('/vue'))) {
            return 'vue';
          } else if (id.includes('node_modules') && id.includes('/lodash')) {
            return 'lodash';
          } else if (id.includes('node_modules') && id.includes('/xlsx/')) {
            return 'xlsx';
          } else if (id.includes('node_modules') && id.includes('/axios/')) {
            return 'axios';
          } else if (id.includes('node_modules') && id.includes('/qs/')) {
            return 'qs';
          } else if (id.includes('node_modules') && id.includes('ant-design')) {
            return 'antd';
          } else if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  define: {
    'process.env': {},
    'process.versions': {},
  },
});
