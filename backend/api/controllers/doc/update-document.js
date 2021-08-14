/**
 * Module dependencies
 */

// ...


/**
 * doc/update-document.js
 *
 * Update document.
 */
module.exports = async function updateDocument(req, res) {

  if (!req.body.docId || (!req.body.description || !req.body.tags.length)) {
    return res.send({
      reason: 'incomplete-data',
      success: false,
    })
  }

  /*await Document.update({id: req.body.docId}).set({
    description: req.body.description,
    tags: req.body.tags.map(tag => '\'' + (tag.text ? tag.text : tag).replace(/\'/g, '"') + '\'').join(', '),
  })*/
  let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['description', 'tags']})
  const edits = req.body
  let updates = {}
  if (docObj.description !== edits.description) updates.description = edits.description
  const tagsStr = edits.tags.map(tag => `'${tag.value}'`).join(', ')
  if (docObj.tags !== tagsStr) updates.tags = tagsStr
  if (Object.keys(updates).length > 0) {
    updates.docId = docObj.id
    await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: SUGGESTED EDITS', JSON.stringify(updates), JSON.stringify(updates))
  }

  return res.send({
    success: true,
    document: docObj
  })

};
