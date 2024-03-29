const { Matchers } = require("@pact-foundation/pact");
const { string, integer, boolean, term, hexadecimal } = Matchers

const gameSchema = {
  id: integer(1),
  name: string('Game 1'),
  year: integer(2021),
  thumbnail: term({
    generate: 'http://localhost/static/image.png',
    matcher: 'http://localhost/static/.*\.(png|jpg|jpeg)',
  }),
  primary_color: hexadecimal('ff0000'),
  is_released: boolean(true),
}

module.exports = gameSchema
