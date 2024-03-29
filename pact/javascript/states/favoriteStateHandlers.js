const axios = require('axios')
const { stateHandlers: sharedStateHandlers, sharedContext } = require('./sharedStateHandlers')

const stateHandler = {
  ...sharedStateHandlers,
  'With already added games': async (params) => {
    const data = { game_id: params.game_id }
    const config = {
      headers: {
        Authorization: `Bearer ${sharedContext.token}`
      },
    }
    console.log('Adding a game to favorites')
    console.log(sharedContext)
    await axios.post('http://localhost:8000/favorites/', data, config)
  },
}

module.exports = stateHandler
