function setHeadersToPactRequest(req) {
  req.headers['x-riddle'] = 'mellon'
}

module.exports = setHeadersToPactRequest
