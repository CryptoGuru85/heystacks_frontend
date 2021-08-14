/**
 * Module dependencies
 */

// ...


/**
 * connector/update-and-return-meta.js
 *
 * Update and return meta.
 */
module.exports = async function updateAndReturnMeta(req, res) {

  if (!req.body.docId) {
    return res.send({
      success: false,
    })
  }

  let docId = req.body.docId
  sails.log('Updating meta for doc ' + docId)
  let docObj = await Document.findOne({ where: { id: docId }, select: ['url', 'meta', 'contentDate'] })
  let fileId = docObj.url.match(/\/d\/(?:e\/)?(.*)\//)[1]
  let meta = docObj.meta

  if (fileId && (!docObj.meta || (docObj.meta.lastUpdate && docObj.meta.lastUpdate < (Date.now() - 2 * 60 * 60 * 1000)))) {

    const { exportLink } = await sails.helpers.updateDocMeta(docId, fileId, meta)
    if (exportLink && (!docObj.contentDate || (docObj.contentDate && docObj.contentDate < (Date.now() - 10 * 24 * 60 * 60 * 1000)))) {
      await sails.helpers.updateDocContent(docId, exportLink)
    }
  }

  return res.send({
    success: true,
    meta: meta
  })

};
