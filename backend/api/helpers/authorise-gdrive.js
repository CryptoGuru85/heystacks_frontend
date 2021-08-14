module.exports = {


  friendlyName: 'Get Google drive object',

  description: 'Authorise google drive object using tokens.',

  inputs: {

  },


  fn: async function() {

    const {google} = require('googleapis')

    let redirectUrl = sails.config.environment !== 'production' ?
      'http://localhost:1337/drive-callback'
      : 'https://heystacks.org/drive-callback'
    let googleCreds = {
      'installed': {
        'client_id': process.env.googleClientId,
        'project_id': process.env.googleProjectId,
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://oauth2.googleapis.com/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'client_secret': process.env.googleClientSecret,
        'redirect_uris': [redirectUrl]
      }
    }

    const {client_secret, client_id, redirect_uris} = googleCreds.installed
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0])

    return {
      oAuth2Client: oAuth2Client,
      drive: await google.drive({version: 'v3', auth: oAuth2Client})
    }

  }

};
