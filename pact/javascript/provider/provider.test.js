const path = require('path')
const { Verifier } = require('@pact-foundation/pact')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json')],
    })

    return verifier.verifyProvider()
  })
})
