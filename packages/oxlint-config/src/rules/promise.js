import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['promise'],
  rules: {
    // Require returning inside each `then()` to create readable and reusable Promise chains.
    // `React.Suspense`, which is a use case that does not assume a return value, can be rather confusing.
    'promise/always-return': ['off'],
    'promise/avoid-new': ['off'],
    'promise/no-callback-in-promise': ['warn'],
    // Disallow nested `then()` or `catch()` statements.
    // Disallowing nesting may actually increase complexity.
    'promise/no-nesting': ['off'],
    'promise/no-promise-in-callback': ['warn'],
    'promise/valid-params': ['warn'],
  },
});
