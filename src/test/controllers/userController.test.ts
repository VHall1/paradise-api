import { expect } from 'chai';
import { main } from '../../server';
import request from 'supertest';

describe('userController', () => {
  before(async () => {
    await main();
  });

  it('should be able to create a user', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/user/create')
      .set('content-type', 'application/json')
      .send({
        steam: 'steam:1100001052df7c1',
        discord: '208343668866678786',
      });
    expect(res.status).to.equal(200);
  });
});
