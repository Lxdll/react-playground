import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path'

/** @type {import 'vite'.UserConfig} */
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ['src/template/**'],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
