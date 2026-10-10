import { kaho } from 'eslint-config-kaho';

export default kaho({
  ignores: {
    customGlobs: ['./entrypoints/newtab/components/animate-ui/**/*']
  }
}, {
  rules: {
    '@eslint-react/no-implicit-key': 'off',
    'vibe-proof/prefer-indexed-array-loop': 'off',
    'sukka/prefer-inline-export': 'off'
  }
});
