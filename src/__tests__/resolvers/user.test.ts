import { gql } from 'apollo-server-express';
import { expect } from 'chai';
import { print } from 'graphql';
import request from 'supertest';

describe('User Resolver', () => {
  const steam = 'steam:1100002052df7c1';
  const discord = '20834366886667876';

  it('should be able to create a user', async () => {
    const mutation = gql`
      mutation {
        createUser(
          discord: "${discord}"
          steam: "${steam}"
        ) {
          user {
            steam
            discord
          }
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(mutation),
      });

    expect(response.body?.data.createUser.user?.steam).to.eq(steam);
    expect(response.body?.data.createUser.user?.discord).to.eq(discord);
    expect(response.status).to.eq(200);
  });

  it('should be able to get a user', async () => {
    const query = gql`
      {
        getUser(
          steam: "${steam}"
        ) {
          steam
          discord
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(query),
      });

    expect(response.body?.data.getUser.steam).to.eq(steam);
    expect(response.body?.data.getUser.discord).to.eq(discord);
    expect(response.status).to.eq(200);
  });

  it('should be able to whitelist a user', async () => {
    const mutation = gql`
      mutation {
        setWhitelisted(
          steam: "${steam}"
          whitelisted: true
        ) {
          user {
            whitelisted        
          }
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(mutation),
      });

    expect(response.body?.data.setWhitelisted.user?.whitelisted).to.eq(true);
    expect(response.status).to.eq(200);
  });

  it('should be able to ban a user', async () => {
    const mutation = gql`
      mutation {
        setBanned(
          steam: "${steam}"
          banned: true
        ) {
          user {
            banned        
          }
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(mutation),
      });

    expect(response.body?.data.setBanned.user?.banned).to.eq(true);
    expect(response.status).to.eq(200);
  });

  it('should be able to admin a user', async () => {
    const mutation = gql`
      mutation {
        setAdmin(
          steam: "${steam}"
          admin: true
        ) {
          user {
            admin        
          }
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(mutation),
      });

    expect(response.body?.data.setAdmin.user?.admin).to.eq(true);
    expect(response.status).to.eq(200);
  });

  it('should be able to update user priority', async () => {
    const mutation = gql`
      mutation {
        setPriority(
          steam: "${steam}"
          priority: 3
        ) {
          user {
            priority        
          }
        }
      }
    `;

    const response = await request('http://localhost:4000')
      .post('/graphql')
      .send({
        query: print(mutation),
      });

    expect(response.body?.data.setPriority.user?.priority).to.eq(3);
    expect(response.status).to.eq(200);
  });
});
