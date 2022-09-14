import { fileURLToPath, URL } from 'url'
import type { AliasOptions } from 'vite'

const alias = {
    '@': fileURLToPath(new URL('../src', import.meta.url))
  } as AliasOptions

  export default alias