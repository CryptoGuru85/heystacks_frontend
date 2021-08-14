/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * doc/add-document.js
 *
 * Add document.
 */
module.exports = async function addDocument(req, res) {

  if (!req.body.url || !req.body.description || !req.body.tags) {
    return res.send({
      reason: 'incomplete-data',
      success: false,
    })
  }

  let docUrl = req.body.url.match(/(https:\/\/docs\.google\..{1,6}\/.{1,30}?\/.{1,10}?\/.{5,100}?(\/|$))/)
  if (!docUrl) {
    return res.send({
      reason: 'url-error',
      success: false,
    })
  }

  if (docUrl[0].slice(docUrl[0].length - 1) !== '/') docUrl[0] += '/'
  if (!!docUrl[0].match(/\/u\/\d\//g)) docUrl[0] = docUrl[0].replace(/\/u\/\d\//, '\/')
  let publishedMode = docUrl[0].includes('/d/e/')
  if (publishedMode) docUrl[0] += 'pub'

  const spaceOwnerApprovalEmail = async (owner, space, docId, docTitle, docDescription) => {
    let html = template.docHTML.spaceOwnerApprovalEmail({docTitle, docDescription,  docId, space})
    let message = template.docHTML.spaceOwnerApprovalMessage({docTitle, docDescription, docId, space})
    sails.log(`https://heystacks.org/api/spaces/callback?type=approve&docid=${docId}&space=${space}`)
    owner.forEach(async ownerObj => {
      await sails.helpers.sendEmail(ownerObj.emailAddress, '➕ Approve a new Google doc on your heystacks Gathering', message, html, true)
    })
  }

  if (await Document.count({url: docUrl[0]}) > 0) {
    sails.log('Tried adding an existing doc')

    if (req.body.space) {
      const spaceObj = await Space.findOne({slug: req.body.space})
      const docObj = await Document.findOne({url: docUrl[0]})
      // Send email to me about doc update
      await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: Gathering doc update', JSON.stringify(req.body), JSON.stringify(req.body))

      if (docObj.spacesArr.includes(`"${req.body.space}"`)) return res.send({
        reason: 'already-exists',
        success: false,
      })

      if (
        (docObj.permissions && docObj.permissions.owner && docObj.permissions.owner.length && docObj.permissions.owner[0].emailAddress)
        && spaceObj.owners.findIndex(ow => ow.emailAddress === docObj.permissions.owner[0].emailAddress) >= 0
      ) {
        // Doc exists and it's the same owner
        const newSpacesArr = JSON.parse(docObj.spacesArr).concat(req.body.space)
        await Document.update({id: docObj.id}).set({spacesArr: JSON.stringify(newSpacesArr)})
        docObj.spacesArr = newSpacesArr
        docObj.comments = 0
        docObj.permissions = {}
        return res.send({
          success: true,
          document: docObj
        })
      } else {
        // Exists but different owner - email to space owner asking for approval
        await spaceOwnerApprovalEmail(spaceObj.owners, req.body.space, docObj.id, docObj.title, docObj.description)
        return res.send({
          success: true,
          approvalNeeded: true
        })
      }
    } else {
      return res.send({
        reason: 'already-exists',
        success: false,
      })
    }
  }

  sails.log(docUrl[0])
  let title, metaThumbnail
  [title, metaThumbnail] = await sails.helpers.getDocTitle(docUrl[0] + (publishedMode ? '' : 'edit'))

  if (title === 'cant-access' || title === 'Web word processing, spreadsheets and presentations') {
    // When too much traffic
    [title, metaThumbnail] = await sails.helpers.getDocTitle(docUrl[0] + (publishedMode ? '' : 'preview'))
    if (title === 'cant-access') {
      return res.send({
        reason: 'cant-access',
        success: false,
      })
    }

    if (title === 'Web word processing, spreadsheets and presentations') {
      return res.send({
        reason: 'url-error',
        success: false,
      })
    }
  }

  // const flatten = (arr) => arr.reduce((x, y) => [...x, ...y], [])
  let createObj = {
    title: title.replace(' - Google Sheets', '').replace(' - Google Docs', '').replace(' - Google Slides', '').replace('.docx', '').replace('.xlsx', ''),
    slug: title.replace(' - Google Sheets', '').replace(' - Google Docs', '').replace(' - Google Slides', '').replace('.docx', '').replace('.xlsx', '')
      .toLowerCase().trim().split(' ').slice(0, 8).join(' ')
      .replace(/ /g,'-').replace(/[^\w-]+/g,'').replace(/-+/g, '-').slice(0, 50),
    url: docUrl[0],
    description: req.body.description.trim(),
    tags: req.body.tags.map(tag => '\'' + (tag.text ? tag.text : tag).trim().replace(/\'/g, '"') + '\'').join(', '),
    createdAt: Date.now()
    // hotScore: undefined,
  }
  let queryOut = await sails.sendNativeQuery('insert into `document` (' +
    '`createdAt`,' +
    '`description`,' +
    '`slug`,' +
    '`tags`,' +
    '`title`,' +
    '`updatedAt`,' +
    '`url`,' +
    '`upvotes`,' +
    '`views`,' +
    '`clicks`,' +
    '`allowNotifications`,' +
    '`dateNow`' +
    ') values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [
      createObj.createdAt,
      createObj.description,
      createObj.slug,
      createObj.tags,
      createObj.title,
      createObj.createdAt,
      createObj.url,
      0,
      0,
      0,
      1,
      createObj.createdAt
    ])
  // let docObj = await Document.create(createObj).fetch()

  await Document.update({id: queryOut.insertId}).set({dateNow: Date.now()})
  let docObj = await Document.findOne({
    where: {id: queryOut.insertId},
    select: ['createdAt', 'updatedAt', 'id', 'title', 'slug', 'url', 'description', 'tags', 'upvotes', 'views', 'meta', 'permissions', 'allowNotifications', 'hallOfFame']
  })
  req.body.tags.filter(tag => (tag.text || tag).trim()).map(async tag => {
    let tidyTag = (tag.text ? tag.text : tag).trim().replace(/\'/g, '"')
    let tagObj = await Tag.find({title: tidyTag})
    if (tagObj && tagObj.length) {
      let tObj = tagObj.find(t => t.title === tidyTag) // checking for case match
      if (tObj) await Tag.update({id: tObj.id}).set({count: tObj.count + 1})
    } else {
      await Tag.create({title: tidyTag, count: 1})
    }
  })

  let exportLink
  let approvalNeeded = false
  let spaceObj
  if (req.body.space) {
    spaceObj = await Space.findOne({slug: req.body.space})
    if (!spaceObj) return res.send({
      reason: 'space-error',
      success: false,
    })
  }

  try {
    let fileId = docObj.url.match(/\/d\/(?:e\/)?(.*)\//)[1]
    if (fileId && !docObj.url.includes('/e/')) {

      docObj.meta = { metaThumbnail }
      const metaResponse = await sails.helpers.updateDocMeta(docObj.id, fileId, docObj.meta)
      const owner = metaResponse.owner
      exportLink = metaResponse.exportLink
      await sails.helpers.updateDocContent(docObj.id, exportLink)
      let html = template.docHTML.docNotifEmail({docObj})
      let message = template.docHTML.docNotifMessage({docObj})
      if (owner && owner.emailAddress) {
        await sails.helpers.sendEmail(owner.emailAddress, '✅ Your Google doc has been added to heystacks', message, html)

        if (req.body.space) {
          if (spaceObj.owners.findIndex(ow => ow.emailAddress === owner.emailAddress) >= 0) {
            await Document.update({id: docObj.id}).set({spacesArr: `[\"${req.body.space}\"]`})
          } else {
            // New doc but different owner
            await spaceOwnerApprovalEmail(spaceObj.owners, req.body.space, docObj.id, docObj.title, docObj.description)
            approvalNeeded = true
          }
        }
      } else {
        // New doc but no owner
        if (req.body.space) {
          await spaceOwnerApprovalEmail(spaceObj.owners, req.body.space, docObj.id, docObj.title, docObj.description)
          approvalNeeded = true
        }
      }
    } else {
      // Published doc - no owner
      if (req.body.space) {
        await spaceOwnerApprovalEmail(spaceObj.owners, req.body.space, docObj.id, docObj.title, docObj.description)
        approvalNeeded = true
      }
    }
  }
  catch(error) {
    sails.log(error)
  }

  await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: New document' + (exportLink ? ': ' : ' -NO-EXPORT-: ') + docObj.title, JSON.stringify(docObj), JSON.stringify(docObj))
  /*let socialMsg = docObj.description + ' 👇' +
    '\n\nhttps://heystacks.org/doc/' + docObj.id + '/' + docObj.slug +
    '\n\n' /!*'+
    Find More Google docs like this on heystacks\n' +
    '\n' +*!/
    docObj.tags.split(',').map(tag => '#' + tag.trim().replace(/#/g, '').replace(/\s/g, '').replace(/-/g, '').replace(/\'/g, '').replace(/\"/g, '')).join(' ')
  await sails.helpers.tweet(socialMsg)
  await sails.helpers.facebook(socialMsg)*/

  docObj.comments = 0
  docObj.permissions = docObj.permissions ? {canEdit: docObj.permissions.canEdit, canComment: docObj.permissions.canComment} : {}

  return res.send({
    success: true,
    approvalNeeded: approvalNeeded,
    document: docObj
  })

};
