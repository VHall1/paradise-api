import { expect } from 'chai';
import { main } from '../server';

describe('Server Setup', () => {
  before(async () => {
    await main();
  });

  it('should start the test server', () => {
    // Should always pass
    expect(true).to.eq(true);
  });
});
