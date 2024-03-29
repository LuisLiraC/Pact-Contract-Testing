const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const axios = require('axios')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [
        // path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json'),
        path.resolve(process.cwd(), '../pacts/GameConsumer-FastAPIProvider.json'),
        path.resolve(process.cwd(), '../pacts/UsersConsumer-FastAPIProvider.json')
      ],
      stateHandlers: {
        'An existing user': async () => {
          const randomNumber = Math.floor(Math.random() * 100000)
          const user = {
            email: `email-provider-${randomNumber}@email.com`,
            password: '123456'
          }
          const { data } = await axios.post('http://localhost:8000/signup/', user)

          return Promise.resolve({
            email: user.email,
            password: user.password,
            token: data.data.token
          })
        },
        'A new user with random number': () => {
          const randomNumber = Math.floor(Math.random() * 100000)
          return Promise.resolve({ randomNumber })
        }
      }
    })

    return verifier.verifyProvider()
  })
})
