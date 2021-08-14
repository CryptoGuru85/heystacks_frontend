/**
 * Module dependencies
 */

// ...


/**
 * doc/vote-document.js
 *
 * Vote document.
 */
module.exports = async function voteDocument(req, res) {

  if (!req.body.docId) {
    return res.send({
      success: false,
    })
  }

  sails.log('Toggle vote doc ' + req.body.docId)
  let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['upvotes', 'spacesArr']})
  await Document.update({id: req.body.docId}).set({
    upvotes: docObj.upvotes + (req.body.remove ? -1 : 1),
    dateNow: Date.now()
  })
  const spacesArr = JSON.parse(docObj.spacesArr)
  if (spacesArr && spacesArr.length) {
    spacesArr.forEach(async space => {
      const spaceObj = await Space.findOne({slug: space})
      await Space.update({slug: space})
        .set({upvotes: spaceObj.upvotes + (req.body.remove ? -1 : 1)})
    })
  }

  return res.send({
    success: true,
  })

};
