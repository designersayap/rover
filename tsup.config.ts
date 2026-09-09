import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ['react', 'react-dom'],
  banner({ format }) {
    if (format === 'esm') {
      return {
        js: "'use client';\nimport './index.css';",
      };
    }
    return {
      js: "'use client';\nrequire('./index.css');",
    };
  },
});
