import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPath from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [tsconfigPath(), react()],
    test: {
        environment: 'jsdom'
    }
})