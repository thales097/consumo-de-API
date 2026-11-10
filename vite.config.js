import { existsSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugIn = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
  // /api/* nunca deve ser respondido pelo service worker
  workbox: {
    navigateFallbackDenylist: [/^\/api\//],
  },
  manifest: {
    name: 'Sucata',
    short_name: 'Sucata',
    description: 'Filmes e conteúdos',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/maskable_icon_x128.png', sizes: '128x128', type: 'image/png', purpose: 'maskable' },
    ],
    theme_color: '#171717',
    background_color: '#f0e7db',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
}

// Executa as funções da pasta /api (formato Vercel) no `npm run dev`,
// para que /api/filmes funcione sem precisar do `vercel dev`.
function apiLocal(env) {
  return {
    name: 'api-local',
    configureServer(server) {
      Object.assign(process.env, env)

      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next()

        const url = new URL(req.url, 'http://localhost')
        const nome = url.pathname.replace('/api/', '')

        res.status = (codigo) => {
          res.statusCode = codigo
          return res
        }
        res.json = (corpo) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(corpo))
          return res
        }

        if (!/^[\w-]+$/.test(nome)) {
          return res.status(404).json({ erro: 'Rota não encontrada' })
        }

        if (!existsSync(`api/${nome}.js`)) {
          return res.status(404).json({ erro: 'Rota não encontrada' })
        }

        try {
          const modulo = await server.ssrLoadModule(`/api/${nome}.js`)
          req.query = Object.fromEntries(url.searchParams)
          await modulo.default(req, res)
        } catch (erro) {
          console.error(`Erro em /api/${nome}:`, erro)
          res.status(500).json({ erro: 'Erro na função da API' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), VitePWA(manifestForPlugIn), apiLocal(env)],
  }
})