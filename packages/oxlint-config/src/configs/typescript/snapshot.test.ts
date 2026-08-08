import { getOxlintConfig } from '../../utils/helper.ts';

describe('typescript', () => {
  it('should match oxlint config snapshot', () => {
    expect(getOxlintConfig(import.meta.dirname)).toMatchSnapshot();
  });
});
