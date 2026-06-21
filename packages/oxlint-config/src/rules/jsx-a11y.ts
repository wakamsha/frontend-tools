import { defineConfig } from 'oxlint';

export default defineConfig({
  plugins: ['jsx-a11y'],
  rules: {
    // Enforce that all elements that require alternative text have meaningful information
    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: [],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],
    'jsx-a11y/anchor-ambiguous-text': ['off'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/control-has-associated-label': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        depth: 25,
      },
    ],
    'jsx-a11y/mouse-events-have-key-events': ['off'],
    'jsx-a11y/no-autofocus': [
      'error',
      {
        ignoreNonDOM: true,
      },
    ],
    'jsx-a11y/no-distracting-elements': [
      'error',
      {
        elements: ['marquee', 'blink'],
      },
    ],
    // WAI-ARIA roles should not be used to convert an interactive element to non-interactive
    'jsx-a11y/no-interactive-element-to-noninteractive-role': [
      'error',
      {
        tr: ['none', 'presentation'],
      },
    ],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'jsx-a11y/prefer-tag-over-role': ['off'],
  },
});
