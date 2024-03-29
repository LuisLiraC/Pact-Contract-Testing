const { PactV3, Matchers } = require('@pact-foundation/pact')
const axios = require('axios')
const path = require('path')
const { like, string, integer } = Matchers
const { fromProviderState } = require("@pact-foundation/pact/src/v3/matchers");


const pact = new PactV3({
  dir: path.resolve(process.cwd(), '../pacts'),
  consumer: 'UsersConsumer',
  provider: 'FastAPIProvider',
})

const userData = {
  token: string(),
  user: like({
    id: integer(),
    email: string()
  })
}

describe('Users consumer', () => {
  // it('should return new user data', () => {
  //   pact
  //     .given('A new user with random number')
  //     .uponReceiving('A request to create a new user')
  //     .withRequest({
  //       method: 'POST',
  //       path: '/signup/',
  //       body: {
  //         email: fromProviderState('email-${randomNumber}@email.com', 'email-123456@email.com'),
  //         password: '123456',
  //       }
  //     })
  //     .willRespondWith({
  //       status: 201,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: {
  //         data: userData
  //       }
  //     })
  //
  //   return pact.executeTest(async (mockServer) => {
  //     const data = { email: 'email-123456@email.com', password: '123456' }
  //     await axios.post(`${mockServer.url}/signup/`, data)
  //   })
  // })

  it('should return user data after sign in', () => {
    pact
      .given('An existing user')
      .uponReceiving('A request to sign in')
      .withRequest({
        method: 'POST',
        path: '/signin/',
        body: {
          email: fromProviderState('${email}', 'email@email.com'),
          password: fromProviderState('${password}', '123456')
        }
      })
      .willRespondWith({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          data: userData
        }
      })

    return pact.executeTest(async (mockServer) => {
      const data = { email: 'email@email.com', password: '123456' }
      await axios.post(`${mockServer.url}/signin/`, data)
    })
  })
});
