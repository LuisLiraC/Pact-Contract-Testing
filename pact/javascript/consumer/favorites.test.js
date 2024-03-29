const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const { integer, eachLike } = Matchers
const gameSchema = require('../schemas/game')
const { fromProviderState } = require("@pact-foundation/pact/src/v3/matchers");
const { AN_EXISTING_USER } = require("../states/states");


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'FavoritesConsumer',
  provider: 'FastAPIProvider',
})

describe('Favorites', () => {
  it('User can add a game to favorites', () => {
    pact
      .given(AN_EXISTING_USER)
      .uponReceiving('A request to add a game to favorites')
      .withRequest({
        method: 'POST',
        path: '/favorites/',
        headers: {
          'Authorization': fromProviderState('Bearer ${token}', 'Bearer token')
        },
        body: {
          game_id: 1
        }
      })
      .willRespondWith({
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          data: {
            id: integer(),
            game: gameSchema
          }
        }
      })

    return pact.executeTest(async (mockServer) => {
      const data = { game_id: 1 }
      const config = {
        headers: { Authorization: 'Bearer token' }
      }

      await axios.post(`${mockServer.url}/favorites/`, data, config)
    })
  })

  it('Should return all the favorite games', () => {
    pact
      .given(AN_EXISTING_USER)
      .given('With already added games', { game_id: 6 })
      .uponReceiving('A request to get all favorite games')
      .withRequest({
        method: 'GET',
        path: '/favorites/',
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
          data: eachLike({
            id: integer(),
            game: gameSchema
          })
        }
      })

    return pact.executeTest(async (mockServer) => {
      const config = {
        headers: {Authorization: 'Bearer token'}
      }

      await axios.get(`${mockServer.url}/favorites/`, config)
    })
  })
})
