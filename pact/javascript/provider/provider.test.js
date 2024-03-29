const path = require('path')
const { Verifier } = require('@pact-foundation/pact')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [
        // path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json'),
        path.resolve(process.cwd(), '../pacts/GameConsumer-FastAPIProvider.json')
      ],
      stateHandlers: {
        'A logged user with a valid token': () => {
          console.log('Setting up a logged user with a valid token')
          return Promise.resolve({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzExNzc3NDUzfQ.zh5PIoLumjj0jG5c4MfhX7uJHso9MG8Zb3Aslfk-Tfw'
          })
        }
      }
    })

    return verifier.verifyProvider()
  })
})
