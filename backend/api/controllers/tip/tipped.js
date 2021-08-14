/**
 * Module dependencies
 */
const template = require('../../templates/tip-html')
// ...


/**
 * tip/tipped.js
 *
 * Tipped tip.
 */
module.exports = async function tipped(req, res) {

  let body = JSON.stringify(req.body, null, 2)
  await sails.helpers.sendEmail(process.env.alertEmail, '💰 TIP ADDED', body, body, true)

  let docObj = await Document.findOne({
    where: {id: req.body.id},
    select: ['title']
  })

  let html = template.tippedEmail({docObj})
  let message = template.tippedMessage({docObj})
  if (req.body.payPalData && req.body.payPalData.payer && req.body.payPalData.payer.email_address)
    await sails.helpers.sendEmail(req.body.payPalData.payer.email_address, '💰 Thank you for tipping content creators', message, html, true)

  return res.send({
    success: true,
  })

};
