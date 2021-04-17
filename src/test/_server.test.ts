import { main } from '../server';
import { expect } from 'chai';

describe('Setup Server', () => {
  before(async () => {
    await main();
  });

  it('should start server', () => {
    expect(true).to.equal(true);
  });
});
