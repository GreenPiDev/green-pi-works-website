import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Carousel (public/js) ve veri dosyaları (src/data) modül grafiğinde HMR ile
// güncellenemiyor; bunlar değişince sayfayı otomatik yenile.
function reloadOnCarouselOrData(): Plugin {
  return {
    name: 'reload-on-carousel-or-data',
    configureServer(server) {
      server.watcher.on('change', (file) => {
        const f = file.replace(/\\/g, '/')
        if (f.includes('/public/js/') || f.includes('/src/data/')) {
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reloadOnCarouselOrData()],
  // Aynı ağdaki diğer cihazlar da erişebilsin (0.0.0.0'a bağlan)
  server: { host: true },
  preview: { host: true },
})
