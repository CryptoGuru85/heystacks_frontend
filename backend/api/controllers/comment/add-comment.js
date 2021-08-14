/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * comment/add-comment.js
 *
 * Add comment.
 */
module.exports = async function addComment(req, res) {

  const extractLinks = (text) => {
    const reUrl = /(https:\/\/.+?)(\s|$|\.\s|\.$|\,\s|\,$)/g
    let matches = [...text.matchAll(reUrl)]
    let replaced = []
    if (matches) {
      matches.forEach(match => {
        const url = match['1']
        if (replaced.indexOf(url) < 0) {
          console.log(url)
          replaced.push(url)
          text = text.replace(
            new RegExp(url.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
            '<a href="' + url + '" title="' + url + '" target="_blank">' + url + '</a>'
          )
        }
      })
      return text
    } else {
      return text
    }
  }

  let commentObj = await Comment.create({
    text: req.body.text.includes('https://') ? extractLinks(req.body.text) : req.body.text,
    nickname: req.body.nickname,
    emailAddress: req.body.emailAddress,
    replyTo: req.body.replyTo,
    document: req.body.id
  }).fetch()

  let docObj = await Document.findOne({where: {id: req.body.id}, select: ['allowNotifications', 'title', 'id', 'slug', 'permissions']})

  let body = JSON.stringify({
    document: req.body.id,
    nickname: req.body.nickname,
    text: req.body.text
  })
  await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: COMMENT ADDED', body, body)
  if (docObj.allowNotifications && req.body.notify) {
    let html = template.commentHTML.commentNotifEmail({ docObj, ...req.body})
    let message = template.commentHTML.newCommentNotifMessage({docObj, commentObj, ...req.body})
    let owner = docObj.permissions && docObj.permissions.owner
    if (owner) await sails.helpers.sendEmail(owner[0].emailAddress, '💬 New comment on your Google doc\'s heystacks page', message, html)
  }

  if (req.body.emailAddress && (await NotificationUser.count({emailAddress: req.body.emailAddress})) === 0) {
    await NotificationUser.create({emailAddress: req.body.emailAddress})
  }

  if (commentObj.replyTo && commentObj.replyTo !== -1) {
    let replyObj = await Comment.findOne({id: commentObj.replyTo})
    let owner = docObj.permissions && docObj.permissions.owner
    if (replyObj.emailAddress && replyObj.emailAddress !== owner) {
      sails.log('Sending comment reply to email')
      let html = template.commentHTML.commentReplyNotifEmail({...req.body, docObj})
      let message = template.commentHTML.commentReplyNotifMessage({...req.body, docObj})
      await sails.helpers.sendEmail(owner[0].emailAddress, '💬 Someone replied to your comment in heystacks', message, html)
    }
  }

  return res.send({
    success: true,
    comment: commentObj
  })
};
