const {AN_EXISTING_USER} = require("./states");
const axios = require("axios");

const sharedContext ={}

const stateHandlers = {
  [AN_EXISTING_USER]: async () => {
    const randomNumber = Math.floor(Math.random() * 100000)
    const user = {
      email: `email-provider-${randomNumber}@email.com`,
      password: '123456'
    }
    const { data } = await axios.post('http://localhost:8000/signup/', user)

    sharedContext.token = data.data.token

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

module.exports = {
  stateHandlers,
  sharedContext
}
