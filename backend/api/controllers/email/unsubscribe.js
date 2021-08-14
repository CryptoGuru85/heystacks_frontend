/**
 * Module dependencies
 */

// ...


/**
 * email/unsubscribe.js
 *
 * Unsubscribe email.
 */
module.exports = async function unsubscribe(req, res) {
  if (!req.body.emailAddress || !req.body.id || !req.body.mode) {
    return res.send({
      success: false,
    })
  }

  let updateObj = req.body.mode === 'stop' ? {active: false} : {frequency: 28}
  await NotificationUser.update({emailAddress: req.body.emailAddress.trim().replace(/\s/g, '+'), id: req.body.id}).set(updateObj)
  sails.log('Unsubscribed ' + req.body.id + ' mode ' + req.body.mode)

  return res.send({
    success: true,
  })

};
