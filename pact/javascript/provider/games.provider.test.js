const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const stateHandlers = require('../states/gameStatesHandlers')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [path.resolve(process.cwd(), '../pacts/GameConsumer-FastAPIProvider.json')],
      stateHandlers,
    })

    return verifier.verifyProvider()
  })
})
