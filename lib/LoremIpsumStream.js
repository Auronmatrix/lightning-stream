const Readable = require('stream').Readable
const utils = require('./utils')
const defaultIpsText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const LIP_SLEEP = process.env.LIP_SLEEP || 30

class LoremIpsumStream extends Readable {
  constructor (options) {
    super(options)
    this.lipsParts = options.lipstext ? options.lipstext.split(' ') : defaultIpsText.split(' ')
    this.lipsIndex = 0
  }

  nextIndex () {
    this.lipsIndex += 1
    if (this.lipsIndex >= this.lipsParts.length) {
      this.lipsIndex = 0
    }
  }

  async _read () {
    await utils.sleep(LIP_SLEEP)
    this.nextIndex()
    this.push(this.lipsParts[this.lipsIndex])
  }
}

module.exports = LoremIpsumStream
