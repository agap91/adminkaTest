const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['vue-kindergarten'] = require('../middleware/vue-kindergarten.js')
middleware['vue-kindergarten'] = middleware['vue-kindergarten'].default || middleware['vue-kindergarten']

export default middleware
