import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

// Next.js 16 で `next lint` が廃止され、ESLint 10 は flat config しか読まない。
// eslint-config-next 16 は flat config を直接エクスポートしている。
const eslintConfig = [
  { ignores: ['.next/**', 'out/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
]

export default eslintConfig
