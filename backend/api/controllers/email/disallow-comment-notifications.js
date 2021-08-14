/**
 * Module dependencies
 */

// ...


/**
 * email/disallow-comment-notifications.js
 *
 * Disallow comment notifications.
 */
module.exports = async function disallowCommentNotifications(req, res) {

  await Document.update({id: req.body.id}).set({allowNotifications: false})

    return res.send({
      success: true,
    })

};
