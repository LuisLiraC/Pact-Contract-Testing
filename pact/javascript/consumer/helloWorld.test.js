const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'HelloWorldConsumer',
  provider: 'FastAPIProvider',
})

describe('Hello world', () => {
  it('should say hello', () => {
    pact
      .given('Hello world')
      .uponReceiving('A request to receive hello world')
      .withRequest({
        method: 'GET',
        path: '/',
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          "Hello": "World"
        }
      })

    return pact.executeTest(async (mockServer) => {
      await axios.get(`${mockServer.url}/`)
    })
  })
})
