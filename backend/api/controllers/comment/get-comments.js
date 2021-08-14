/**
 * Module dependencies
 */

// ...


/**
 * comment/get-comments.js
 *
 * Get comments.
 */
module.exports = async function getComments(req, res) {
  
  const sortField = req.body.sort === 'New' ? 'createdAt DESC' : 'upvotes DESC'
    let commentsObj = await Comment.find({
      where: {document: req.body.id},
      sort: sortField,
      select: ['id', 'text', 'nickname', 'replyTo', 'document', 'upvotes', 'createdAt', 'updatedAt']
    })

    const visibleRepliesCount = 3

    let commentsTmp = commentsObj.filter(com => com.replyTo === -1)
    let commentsTmp2 = commentsTmp

    let replies = commentsObj.filter(com => com.replyTo !== -1)
    let offset = 1
    commentsTmp.forEach((com, cid) => {
      let repliesToCom = replies.filter(rep => rep.replyTo === com.id)
      if (repliesToCom.length > 0) {
        let visibleReplies = repliesToCom.slice(0, visibleRepliesCount)
        let hiddenReplies = repliesToCom.slice(visibleRepliesCount, repliesToCom.length)
        visibleReplies.forEach(rep => rep.show = true)
        if (hiddenReplies.length > 0) {
          visibleReplies[visibleReplies.length - 1].showMore = true
          hiddenReplies[hiddenReplies.length - 1].showLess = true
        }
        commentsTmp2 = commentsTmp2.slice(0, cid + offset).concat(visibleReplies).concat(hiddenReplies).concat(commentsTmp2.slice(cid + offset, commentsTmp2.length))
        offset += repliesToCom.length
      }
    })

    return res.send({
      success: true,
      comments: commentsTmp2,
    })

};
