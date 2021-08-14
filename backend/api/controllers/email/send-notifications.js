/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * email/send-notifications.js
 *
 * Send notifications.
 */
module.exports = async function sendNotifications(req, res) {

    let test = true
    let sendingOutMonthly = false // THIS IS NOW BI-MONTHLY
    let docIds = [1036, 1039, 1053]
    let notificationUsersObj = await NotificationUser.find({active: true})
    let emailAddressesToSend = test ? [
      [process.env.alertEmail, 1, 28],
      [process.env.alertEmail, 1, 7]
    ] : notificationUsersObj.filter(nu => nu.active)
      .map(nu => {return [nu.emailAddress.toLowerCase(), nu.id, nu.frequency]})

    if (!sendingOutMonthly) emailAddressesToSend = emailAddressesToSend.filter(emailObj => emailObj[2] === 7)

    let docData = await Promise.all(docIds.map(async did => {
      let docObj = await Document.findOne({id: did})
      return {
        id: docObj.id,
        url: docObj.url,
        slug: docObj.slug,
        title: docObj.title,
        description: docObj.description,
        type: docObj.url.includes('spreadsheet') ? 'sheets' : docObj.url.includes('presentation') ? 'slides' : 'docs',
      }
    }))

    sails.log('Sending fortnightly notifications')
    sails.log(`SENDING OUT ${emailAddressesToSend.length} EMAILS`)

    emailAddressesToSend.forEach(async user => {
      sails.log('Sending notification to ' + user[0])

      // let userObj = (await NotificationUser.find({emailAddress: emailAddress}))[0]

      let html = template.emailHTML.docsEmailUpdate({docData, user})
      let message = template.emailHTML.docsEmailUpdateMessage({docData})

      await sails.helpers.sendEmail(user[0], '⭐ Top 3 docs on heystacks', message, html, true)
    })

    return res.send({
      success: true,
    })

};
