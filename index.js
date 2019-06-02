const LipStream = require('./lib/LoremIpsumStream')
const utils = require('./lib/utils')
const qrcode = require('qrcode-terminal')

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const stopEvery = process.env.STOP_EVERY || 200
const showQR = process.env.SHOW_QR || false

const StrikeClient = require('./lib/StrikeClient')
const strikeClient = new StrikeClient()

let paid = false
let count = 0

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/strike/payment/received', (req, res) => {
    utils.logbreak('Payment Received')
    console.log(req.body)
    paid = true
    utils.logbreak()
})

app.listen(port, () => console.log(`Lightning-Stream listening on port ${port}!`))

const lips = new LipStream({ objectMode: true, highWaterMark: 1 })

const checkBlocked = async (count) => {
    if (count % stopEvery === 0) {
        lips.pause()
        count = 0
        paid = false
        const pr = await strikeClient.getInvoice(10, 'Continue streaming')
        utils.logbreak('Generated LN Invoice')
        console.log(pr)
        if (showQR) {
            utils.logbreak('Invoice QR')
            qrcode.generate(pr)
        }

        while (!paid) {
            await utils.sleep(1000)
        }

        lips.resume()
    }
}

lips.on('data', async (data) => {
    count++
    await checkBlocked(count)
    process.stdout.write(data + " ")
})
    .on('error', console.error)
    .on('end', () => {
        console.log('done')
    })
