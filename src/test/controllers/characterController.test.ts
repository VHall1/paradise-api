import { expect } from 'chai';
import { User } from '../../entities/User';
import request from 'supertest';

describe('characterController', () => {
  const steam = 'steam:1100001052df7c1';
  const discord = '208343668866678786';
  let user: User;

  before(async () => {
    user = new User();

    user.steam = steam;
    user.discord = discord;

    await user.save();
  });

  after(async () => {
    await user.remove();
  });

  it('should be able to create a character', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/character/create')
      .send({
        steam,
        name: 'Zapper',
        surename: 'Men',
        birthdate: '22-84-2138',
      });

    expect(res.status).to.equal(200);
  });
});
