/**
 * Module dependencies
 */

// ...


/**
 * connector/check-for-content-update.js
 *
 * Check for content update.
 */
module.exports = async function checkForContentUpdate(req, res) {

  if (!req.body.docId) {
    return res.send({
      success: false,
    })
  }

  let docId = req.body.docId
  let docObj = await Document.findOne({ where: { id: docId }, select: ['url', 'meta', 'contentDate', 'archived'] })
  let meta = docObj.meta || {}

  if (meta.exportLink && !docObj.archived && (!docObj.contentDate || (docObj.contentDate && docObj.contentDate < (Date.now() - 10 * 24 * 60 * 60 * 1000)))) {
    // await sails.helpers.updateDocMeta(docId, meta.fileId, meta)
    await sails.helpers.updateDocContent(docId, meta.exportLink, false, true)
    // await sails.helpers.createSoDoc(docId)
    /*if (!meta.metaThumbnail) {
      let title, metaThumbnail
      [title, metaThumbnail] = await sails.helpers.getDocTitle(docObj.url + 'edit')
      if (metaThumbnail) {
        meta.metaThumbnail = metaThumbnail
        await Document.update({id: docId}).set({meta: meta})
      }
    }*/
  }

  return res.send({
    success: true
  })

};
