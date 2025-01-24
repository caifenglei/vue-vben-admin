import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/iapi': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/iapi/, ''),
            // 租赁目标地址
            target: 'http://pro-leasehold-service.test/api',
            ws: true,
          },
        },
      },
    },
  };
});
