# Lightning-Stream

Simple POC app that streams random lorem ipsum text when paid via lightning

![](output.gif)

<sup>Don't worry, the gif's API key has been replaced. </sup>

- Backend uses ACINQ [Strike](https://dev.strike.acinq.co)
- Testnet Wallet [HTLC.me](https://htlc.me/)

## Getting started

```
$ git clone 
$ cd lighting-stream
$ npm i
```

### Setup NGROK:

1. Create NGROK account https://ngrok.com/
2. Follow dashboard instructions to configure
3. Run NGROK instance to listen to localhost 3000 (`./ngrok http 3000`)
4. Copy the NGROK url 

#### Setup Strike:
1. Register on the DEVELOPMENT strike platform https://dev.strike.acinq.co
2. Go to settings -> webhooks -> change hook url and set to
3. http://`<your-instance>`.ngrok.io/strike/payment/received
4. Go to API Keys and copy your API key


## Run Lightning-stream

```
$ env STRIKE_API_KEY=<Your_Strike_API> node index.js
```