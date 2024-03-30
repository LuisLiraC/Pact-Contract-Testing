const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const { eachLike } = Matchers
const gameSchema = require('../schemas/game')
const { fromProviderState } = require("@pact-foundation/pact/src/v3/matchers");
const { AN_EXISTING_USER } = require("../states/states");


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'GameConsumer',
  provider: 'FastAPIProvider',
})

describe('Game consumer', () => {
  it('should return all games', () => {
    pact
      .given('Un estado de los juegos')
      .given('A state of games')
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
      .given(AN_EXISTING_USER)
      .given('A state of games')
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

  /**
   * Abajo se agregan los tests para los casos de error o casos negativos
   * estos tests también son necesarios para asegurarnos que nuestro proveedor
   * cumple con la especificación que definimos en nuestro contrato.
   */
  it('should return 401 when token is invalid', () => {
    pact
      .given('An invalid token')
      .uponReceiving('A request to receive a game by ID with invalid token')
      .withRequest({
        method: 'GET',
        path: '/games/1/',
        headers: {
          'Authorization': 'Bearer invalidToken'
        }
      })
      .willRespondWith({
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        }
      })

    return pact.executeTest(async (mockServer) => {
      const config = {
        headers: { 'Authorization': 'Bearer invalidToken' }
      }
      try {
        await axios.get(`${mockServer.url}/games/1/`, config)
      } catch (error) {
        return error
      }
    })
  })

  it('should return 403 when token is missing', () => {
    pact
      .given('A missing token')
      .uponReceiving('A request to receive a game by ID with missing token')
      .withRequest({
        method: 'GET',
        path: '/games/1/',
      })
      .willRespondWith({
        status: 403,
        headers: {
          'Content-Type': 'application/json',
        }
      })

    return pact.executeTest(async (mockServer) => {
      try {
        await axios.get(`${mockServer.url}/games/1/`)
      } catch (error) {
        return error
      }
    })
  })
});
