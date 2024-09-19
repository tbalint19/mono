// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    file: 'out/index.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
  ],
};