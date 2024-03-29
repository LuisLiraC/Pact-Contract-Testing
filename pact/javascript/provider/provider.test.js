const path = require('path')
const { Verifier } = require('@pact-foundation/pact')
const axios = require('axios')

describe('Pact Verification', () => {
  it('should validate the pact', () => {
    const verifier = new Verifier({
      providerBaseUrl: 'http://localhost:8000',
      pactUrls: [
        // path.resolve(process.cwd(), '../pacts/HelloWorldConsumer-FastAPIProvider.json'),
        // path.resolve(process.cwd(), '../pacts/GameConsumer-FastAPIProvider.json')
        path.resolve(process.cwd(), '../pacts/UsersConsumer-FastAPIProvider.json')
      ],
      stateHandlers: {
        'A logged user with a valid token': () => {
          console.log('Setting up a logged user with a valid token')
          return Promise.resolve({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzExNzc3NDUzfQ.zh5PIoLumjj0jG5c4MfhX7uJHso9MG8Zb3Aslfk-Tfw'
          })
        },
        'A new user with random number': () => {
          const randomNumber = Math.floor(Math.random() * 100000)
          return Promise.resolve({ randomNumber })
        },
        'User already exists': async () => {
          const randomNumber = Math.floor(Math.random() * 100000)
          const data = {
            email: `email-provider-${randomNumber}@email.com`,
            password: '123456'
          }
          await axios.post('http://localhost:8000/signup/', data)

          return Promise.resolve({
            email: data.email,
            password: data.password
          })
        },
      }
    })

    return verifier.verifyProvider()
  })
})
