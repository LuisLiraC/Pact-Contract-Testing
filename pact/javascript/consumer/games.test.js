const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const { eachLike } = Matchers
const gameSchema = require('../schemas/game')
const { fromProviderState } = require("@pact-foundation/pact/src/v3/matchers");


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'GameConsumer',
  provider: 'FastAPIProvider',
})

describe('Game consumer', () => {
  // it('should return all games', () => {
  //   pact
  //     .uponReceiving('A request to receive all games')
  //     .withRequest({
  //       method: 'GET',
  //       path: '/games/',
  //     })
  //     .willRespondWith({
  //       status: 200,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: {
  //         data: eachLike(gameSchema, { min: 4 }),
  //       }
  //     })
  //
  //   return pact.executeTest(async (mockServer) => {
  //     await axios.get(`${mockServer.url}/games/`)
  //   })
  // });

  it('should return a game by ID', () => {
    pact
      .given('An existing user')
      .uponReceiving('A request to receive a game by ID')
      .withRequest({
        method: 'GET',
        path: '/games/1/',
        headers: {
          'Authorization': fromProviderState('Bearer ${token}', 'Bearer token')
        }
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          data: gameSchema
        }
      })

    return pact.executeTest(async (mockServer) => {
      await axios.get(`${mockServer.url}/games/1/`, {
        headers: { 'Authorization': 'Bearer token' }
      })
    })
  });
});
