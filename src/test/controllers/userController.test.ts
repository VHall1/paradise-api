import { expect } from 'chai';
import { main } from '../../server';
import { User } from '../../entities/User';
import request from 'supertest';

describe('userController', () => {
  const steam = 'steam:1100001052df7c1';
  const discord = '208343668866678786';

  before(async () => {
    await main();
  });

  it('should be able to create a user', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/user/create')
      .send({ steam, discord });

    expect(res.body.user.steam).to.equal(steam);
    expect(res.body.user.discord).to.equal(discord);

    expect(res.status).to.equal(200);
  });

  it('should be able to get a user', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`).get(
      `/user/${steam}`
    );

    expect(res.body.user.steam).to.equal(steam);
    expect(res.body.user.discord).to.equal(discord);

    expect(res.status).to.equal(200);
  });

  it('should be able to set whitelisted', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/user/set_whitelisted')
      .send({ steam, status: true });

    const user = await User.findOneOrFail({ steam });

    expect(user.whitelisted).to.equal(true);
    expect(res.status).to.equal(200);
  });

  it('should be able to set banned', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/user/set_banned')
      .send({ steam, status: true });

    const user = await User.findOneOrFail({ steam });

    expect(user.banned).to.equal(true);
    expect(res.status).to.equal(200);
  });

  it('should be able to set priority', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/user/set_priority')
      .send({ steam, priority: 3 });

    const user = await User.findOneOrFail({ steam });

    expect(user.priority).to.equal(3);
    expect(res.status).to.equal(200);
  });
});
