/**
 * Module dependencies
 */

// ...


/**
 * connector/get-google-auth-url.js
 *
 * Get google auth url.
 */
module.exports = async function getGoogleAuthUrl(req, res) {

  const {oAuth2Client, drive} = await sails.helpers.authoriseGdrive()

    const SCOPES = [
      // 'https://www.googleapis.com/auth/drive.metadata',
      // 'https://www.googleapis.com/auth/drive',

      // 'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.file',
    ]

    let authUrl = 'https://heystacks.org'
    authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
      prompt: 'consent'
    })

    let gDriveAccount = ''
    return res.send({
      authUrl: authUrl,
      gDriveAccount: gDriveAccount
    })

};
