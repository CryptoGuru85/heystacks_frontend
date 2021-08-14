module.exports = {


  friendlyName: 'Tweet a tweet to Twitter',

  inputs: {
    content: {
      type: 'string',
    },
  },


  fn: async function(inputs) {

    let fs = require('fs')
    fs.readFile((process.env.homePath || '..') + '/sendNotifications.txt', async (err, text) => {
      if (err) sails.log(err)
      if (text.toString().trim() === '1') {

        let creds = {
          'consumer_key': process.env.twitterKey,
          'consumer_secret': process.env.twitterSecret,
          'access_token_key': process.env.twitterTokenKey,
          'access_token_secret': process.env.twitterTokenSecret
        }

        let Twitter = require('twitter')
        let T = new Twitter(creds)

        let tweet = {
          status: inputs.content
        }
        T.post('statuses/update', tweet, (err) => {
          if (err) {
            sails.log('TWITTER ERROR MESSAGE: ' + JSON.stringify(err))
          }
        })

      }
    })

  }

};
