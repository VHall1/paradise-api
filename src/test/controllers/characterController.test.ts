import { expect } from 'chai';
import { User } from '../../entities/User';
import { Character } from '../../entities/Character';
import request from 'supertest';

describe('characterController', () => {
  const steam = 'steam:1100001052df7c1';
  const discord = '208343668866678786';

  const name = 'Zapper';
  const surename = 'Men';
  const birthdate = '22-84-2138';

  const model = 'test_model';
  const custom = { test: 1, test_b: false };

  let user: User;
  let character: Character;

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
        name,
        surename,
        birthdate,
      });

    expect(res.status).to.equal(200);
    expect(res.body.character.name).to.equal(name);
    expect(res.body.character.surename).to.equal(surename);
    expect(res.body.character.birthdate).to.equal(birthdate);

    character = res.body.character;
  });

  it('should be able to update character model', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/character/custom/update_model')
      .send({
        id: character.id,
        model,
      });

    expect(res.status).to.equal(200);
    expect(res.body.model).to.equal(model);
  });

  it('should be able to update character custom', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`)
      .post('/character/custom/update_custom')
      .send({
        id: character.id,
        custom: JSON.stringify(custom),
      });

    expect(res.status).to.equal(200);
    expect(res.body.custom.test).to.equal(1);
    expect(res.body.custom.test_b).to.equal(false);
  });

  it('should be able to get character custom', async () => {
    const res = await request(`http://localhost:${process.env.PORT}`).get(
      `/character/custom/${character.id}`
    );

    expect(res.status).to.equal(200);
    expect(res.body.model).to.equal(model);
    expect(res.body.custom.test).to.equal(1);
    expect(res.body.custom.test_b).to.equal(false);
  });
});
