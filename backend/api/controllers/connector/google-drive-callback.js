/**
 * Module dependencies
 */

// ...


/**
 * connector/google-drive-callback.js
 *
 * Google drive callback.
 */
module.exports = async function googleDriveCallback(req, res) {

  const {oAuth2Client, drive} = await sails.helpers.authoriseGdrive()

  let code = req.param('code')
  if (!code) return res.redirect('/')
  const {tokens} = await oAuth2Client.getToken(code)

  let gDriveToken = tokens
  sails.log(gDriveToken)

  return res.redirect('/')
}
