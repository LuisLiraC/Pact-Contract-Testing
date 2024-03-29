const sharedStateHandler = require('./sharedStateHandlers')

const stateHandler = {
  ...sharedStateHandler,
  'Un estado de los juegos': () => {
    console.log('Setting up a state of games')
  },
  'A state of games': () => {
    console.log('Setting up a state of games')
  },
}

module.exports = stateHandler
