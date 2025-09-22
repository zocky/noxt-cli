import * as utils from '../lib/utils.js'

export const info = {
  name: 'app/main',
  version: '1.0.0',
  description: 'Main module',
  requires: ['noxt-dev']
}

export default mlm => ({
  utils: {...utils}
})
