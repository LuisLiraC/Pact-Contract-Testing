const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const {hexadecimal} = require("@pact-foundation/pact/src/dsl/matchers");
const { string, integer, eachLike, boolean, term } = Matchers


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
          data: eachLike({
            id: integer(1),
            name: string('Game 1'),
            year: integer(2021),
            thumbnail: term({
              generate: 'http://localhost/static/image.png',
              matcher: 'http://localhost/static/.*\.(png|jpg|jpeg)',
            }),
            primary_color: hexadecimal('ff0000'),
            is_released: boolean(true),
          })
        }
      })

    return pact.executeTest(async (mockServer) => {
      await axios.get(`${mockServer.url}/games/`)
    })
  });
});
