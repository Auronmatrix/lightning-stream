const request = require('request')

class StrikeClient {
  constructor (options = {}) {
    this.endpoint = options.api_key || 'https://api.dev.strike.acinq.co'
    this.api_key = options.api_key || process.env.STRIKE_API_KEY
    this.api_version = options.api_version || '/api/v1'
  }

  getInvoice (amount, description, currency = 'btc') {
    const options = {
      method: 'POST',
      url: this.endpoint + '/' + this.api_version + '/charges',
      headers: {
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body: {
        amount,
        description,
        currency
      },
      json: true,
      auth: {
        user: this.api_key,
        pass: ''
      }
    }

    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) reject(error)
        resolve(body)
      })
    })
  }
}

module.exports = StrikeClient