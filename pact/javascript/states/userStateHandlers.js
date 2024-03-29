const { stateHandlers: sharedStateHandlers } = require('./sharedStateHandlers')

const stateHandlers = {
  ...sharedStateHandlers,
}

module.exports = stateHandlers
