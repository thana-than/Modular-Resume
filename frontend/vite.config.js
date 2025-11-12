import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default ({ mode }) => {
  // load env vars for current mode (development/production). third param '' loads all vars
  const env = loadEnv(mode, process.cwd(), '')
  const default_port = 8080
  // Prefer explicit WEB_PORT (Documented environment), then PORT (system), then VITE_PORT (vite env), then PORT from env files, then fallback to 80
  const rawPort = process.env.WEB_PORT || env.WEB_PORT || process.env.PORT || env.VITE_PORT || env.PORT || default_port
  const port = Number.parseInt(rawPort, 10)

  return defineConfig({
    plugins: [react()],
    server: {
      port: Number.isFinite(port) ? port : default_port,
    },
  })
}
