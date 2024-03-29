const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const { eachLike } = Matchers
const gameSchema = require('../schemas/game')


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'GameConsumer',
  provider: 'FastAPIProvider',
})

describe('Game consumer', () => {
  it('should return all games', () => {
    pact
      .uponReceiving('A request to receive all games')
      .withRequest({
        method: 'GET',
        path: '/games/',
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          data: eachLike(gameSchema, { min: 4 }),
        }
      })

    return pact.executeTest(async (mockServer) => {
      await axios.get(`${mockServer.url}/games/`)
    })
  });

  it('should return a game by ID', () => {
    pact
      .uponReceiving('A request to receive a game by ID')
      .withRequest({
        method: 'GET',
        path: '/games/1/',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzExNzc3NDUzfQ.zh5PIoLumjj0jG5c4MfhX7uJHso9MG8Zb3Aslfk-Tfw'
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
        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzExNzc3NDUzfQ.zh5PIoLumjj0jG5c4MfhX7uJHso9MG8Zb3Aslfk-Tfw' }
      })
    })
  });
});
