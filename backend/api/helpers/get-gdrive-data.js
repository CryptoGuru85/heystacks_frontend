module.exports = {


  friendlyName: 'Get Google data using an API',

  inputs: {
    fileId: {
      type: 'string',
    },

    fields: {
      type: 'string',
    }
  },


  fn: async function(inputs) {

    const { google } = require('googleapis')
    let token = {
      access_token: process.env.googleAccessToken,
      refresh_token: process.env.googleRefreshToken,
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive',
      token_type: 'Bearer',
      expiry_date: 1593534934765
    }

    let redirectUrl = 'http://localhost:1337/drive-callback'
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

    let gRes = {data: {}}
    try {
      const {client_secret, client_id, redirect_uris} = googleCreds.installed
      const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0])
      let drive = await google.drive({version: 'v3', auth: oAuth2Client})
      await oAuth2Client.setCredentials(token)

      // let fileId = '1JC9gQn8-e_hL6vZGPBENdt_a3QEkcZVmbi3rv4_xNzE'
      let fileId = inputs.fileId

      gRes = await drive.files.get({
        auto: oAuth2Client,
        fileId: fileId,
        fields: inputs.fields,
      }).catch(err => sails.log(err))

      if (!gRes) gRes = {data: {}}
    } catch(e) {
      sails.log(e)
    }

    return gRes.data

  }

};
