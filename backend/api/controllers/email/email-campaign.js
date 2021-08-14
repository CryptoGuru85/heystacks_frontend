/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * email/email-campaign.js
 *
 * Email campaign.
 */
module.exports = async function emailCampaign(req, res) {

  let emailAddressesToSend = [
    process.env.alertEmail
  ]

  emailAddressesToSend.forEach(async user => {
    sails.log('Sending notification to ' + user)

    // let userObj = (await NotificationUser.find({emailAddress: emailAddress}))[0]

    let html = template.emailHTML.launchEmail()
    let message = template.emailHTML.launchMessage()

    await sails.helpers.sendEmail(user, '🔍 Discover the Best Public Google Docs', message, html, true)
  })

  return res.send({
    success: true,
  })

};
