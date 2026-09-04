import 'dotenv/config';
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: `${process.env.API_URL ?? 'http://localhost:3000'}/docs-json`,
  output: './app/core/generated',

  plugins: [
    '@hey-api/typescript',
    'valibot',
  ],
});