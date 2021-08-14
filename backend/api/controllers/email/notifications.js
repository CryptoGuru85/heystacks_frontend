/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * email/notifications.js
 *
 * Notifications email.
 */
module.exports = async function notifications(req, res) {

  if (!req.body.emailAddress) {
    return res.send({
      success: false,
    })
  }

  const emailAddress = req.body.emailAddress.toLowerCase()
  if (await NotificationUser.count({emailAddress: emailAddress}) > 0) {
    return res.send({
      success: true,
    })
  }

  let notificationUserObj = await NotificationUser.create({emailAddress: emailAddress}).fetch()
  sails.log('Added a new fortnightly notification emailAddress')
  let html = template.emailHTML.notifEmailAddress({...notificationUserObj})
  let message = template.emailHTML.notifEmailAddressMessage()
  await sails.helpers.sendEmail(emailAddress, '✅ Welcome to heystacks!', message, html)

  return res.send({
    success: true,
  })

};
