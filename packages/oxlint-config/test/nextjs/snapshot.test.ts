import { getOxlintConfig } from '../helper.ts';

describe('nextjs', () => {
  it('should match oxlint config snapshot', () => {
    expect(getOxlintConfig(import.meta.dirname)).toMatchSnapshot();
  });
});
