const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const stateHandlers = require('../states/favoriteStateHandlers')
const setHeadersToPactRequest = require('../utils/setHeadersToPactRequest')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [path.resolve(process.cwd(), '../pacts/FavoritesConsumer-FastAPIProvider.json')],
      stateHandlers,
      requestFilter: async (req, res, next) => {
        setHeadersToPactRequest(req)
        next()
      }
    })

    return verifier.verifyProvider()
  })
})
