module.exports = {


  friendlyName: 'Send HTML email',



  inputs: {

    to: {
      example: 'jane@example.com',
      type: 'string',
      description: 'Email address of the desired recipient.',
      required: true
    },

    subject: {
      type: 'string',
      description: 'Subject line for the email.',
      example: 'Welcome, Jane!',
      required: true
    },

    message: {
      type: 'string',
      description: 'The body of the email.',
      required: true
    },

    html: {
      type: 'string',
      description: 'The html of the email.',
      required: true
    },

    force: {
      type: 'boolean',
      description: 'Ignore the sendNotifcations file.',
      defaultsTo: false
    },

  },


  exits: {

    success: {
      description: 'The email was sent successfully.',
      extendedDescription: 'Note that this does not necessarily mean it was _delivered_ successfully.  If you are having issues with mail being delivered, check the Mailgun dashboard for delivery status, and be sure to verify that the email wasn\'t quarantined or flagged as spam by the recipient\'s email service (e.g. Gmail\'s "spam folder" or GSuite\'s "admin quarantine").'
    }

  },


  fn: function(inputs) {

    let API_KEY = process.env.mailgunKey
    let DOMAIN = process.env.mailgunDomain
    let mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN})

    let html = inputs.html
    let message = inputs.message

    const data = {
      from: 'heystacks <info@heystacks.org>',
      to: inputs.to,
      subject: inputs.subject,
      text: message,
      html: html
    };

    let fs = require('fs')
    fs.readFile((process.env.homePath || '..') + '/sendNotifications.txt', async (err, text) => {
      if (err) sails.log(err)
      if (inputs.force || text.toString().trim() === '1') {
        mailgun.messages().send(data, (error, body) => {
          console.log(body)
        })
      }
    })

    return {}
  }

};
