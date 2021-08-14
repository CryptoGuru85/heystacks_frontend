/**
 * Module dependencies
 */

// ...


/**
 * comment/action-comment.js
 *
 * Action comment.
 */
module.exports = async function actionComment(req, res) {
  if (req.body.type === 'upvote') {
    let commentObj = await Comment.findOne({id: req.body.id})
    await Comment.update({
      id: req.body.id
    }).set({upvotes: commentObj.upvotes + (req.body.upvoted ? -1 : 1)})
  }

  if (req.body.type === 'report') {
    let commentObj = await Comment.findOne({id: req.body.id})
    const body = JSON.stringify({
      id: req.body.id,
      docId: commentObj.document,
      reason: req.body.reportReason
    })
    await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: COMMENT REPORT', body, body)
  }

  return res.send({
    success: true,
  })
};
