import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true, // Автоматически открывать браузер
    port: 3000, // Порт по умолчанию
    host: true // Доступ с других устройств в сети
  },
  base: './',
  build: {
    outDir: 'dist', // Папка для сборки
    emptyOutDir: true // Очищать папку при сборке
  }
})