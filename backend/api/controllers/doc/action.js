/**
 * Module dependencies
 */

// ...


/**
 * doc/action.js
 *
 * Action doc.
 */
module.exports = async function action(req, res) {
  if (!req.body.type || !req.body.docId) {
    return res.send({
      success: false,
    })
  }

  sails.log(req.body.type + ': ' + req.body.docId)
  if (req.body.type === 'Reload title') {

    let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['url', 'meta']})
    let newTitle, metaThumbnail
    [newTitle, metaThumbnail] = await sails.helpers.getDocTitle(docObj.url + 'edit')

    if (newTitle === 'cant-access') {
      // When too much traffic
      [newTitle, metaThumbnail] = await sails.helpers.getDocTitle(docObj.url + 'preview')
      if (newTitle === 'cant-access') {
        return res.send({
          reason: 'cant-access',
          success: false,
        })
      }
    }

    let meta = docObj.meta || {}
    if (!meta.metaThumbnail && metaThumbnail) {
      meta.metaThumbnail = metaThumbnail
    }
    await Document.update({id: req.body.docId}).set({title: newTitle, meta: meta})

    return res.send({
      type: 'reload-title',
      newTitle: newTitle,
      success: true,
    })
  } else if (req.body.type === 'Error/out of date') {
    await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: URL NOT WORKING', req.body.docId, req.body.docId)
    return res.send({
      type: 'url-not-working',
      success: true,
    })
  } else if (req.body.type === 'Report abuse incl reason') {
    await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: REPORT ABUSE', req.body.docId + ' ' + req.body.reason, req.body.docId + ' ' + req.body.reason)
    return res.send({
      type: 'report-abuse',
      success: true,
    })
  } else if (req.body.type === 'Click document') {
    let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['id', 'clicks']})
    await Document.update({id: req.body.docId}).set({clicks: (docObj.clicks || 0) + 1})
    return res.send({
      type: 'click-document',
      success: true,
    })
  } else if (req.body.type === 'Read document') {
    let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['id', 'readeds']})
    await Document.update({id: req.body.docId}).set({readeds: (docObj.readeds || 0) + 1})
    return res.send({
      type: 'read',
      success: true,
    })
  }


};
