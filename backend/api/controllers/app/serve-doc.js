/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * app/serve-doc.js
 *
 * Serve doc.
 */
module.exports = async function serveDoc(req, res) {
  const fs = require('fs')
  const app = __dirname + '/../../../assets/index-doc.html'
  // res.writeHead(200, {'Content-Type': 'text/html'})
  // fs.createReadStream(app).pipe(res)
  let docId = req.param('docid')

  let docObj = await Document.findOne({where: {id: parseInt(docId)}, select: ['createdAt', 'updatedAt', 'id', 'title', 'slug', 'url', 'description', 'tags', 'upvotes', 'meta', 'content', 'contentDate', 'archived', 'views', 'hallOfFame', 'spacesArr']})
  if (!docObj) return res.redirect(301, '/?error=document-doesnt-exist')

  let title = docObj.title.replace(/"/g, '')
  let url = 'https://heystacks.org/doc/' + docObj.id + '/' + docObj.slug
  let type = docObj.url.includes('spreadsheet') ? 'Sheet' : docObj.url.includes('presentation') ? 'Slide' : 'Doc'
  let description = docObj.description.replace(/"/g, '') + ' - &#x1f7e7;heystacks'
  let keywords = docObj.title.replace(/"/g, '').replace(/\s/g, ', ') + ', Google, Google Docs, Google Sheets, Excel, Online, public, open data, open knowledge, community, public documents, collaboration'
  let content = docObj.content
  let metaThumbnail = (docObj.meta && docObj.meta.metaThumbnail) ? docObj.meta.metaThumbnail : 'https://heystacks.org/banner.jpg'
  docObj.content = ''
  const findSimilar = async (nTags) => {
    return await Document.find({
      where: {and: [{
          and: docObj.tags.split(', ').slice(0, nTags).map(t => ({tags: {contains: t.replace(/\'/g, '')}}))
        }, {id: {'!=': docObj.id}}, {archived: false}]
      },
      limit: 8,
      sort: [{upvotes: 'DESC'}],
      select: ['id', 'slug', 'title']
    })
  }
  let similarDocs = await findSimilar(3)
  if (similarDocs.length <= 0) similarDocs = await findSimilar(2)
  if (similarDocs.length <= 0) similarDocs = await findSimilar(1)
  let commentsObj = await Comment.find({
    where: {document: docObj.id},
    select: ['text']
  })

  let spaceObj
  const spacesArr = JSON.parse(docObj.spacesArr)
  if (spacesArr.length > 0) {
    spaceObj = await Space.findOne({slug: spacesArr[0]})
  }
  docObj.spaceObj = spaceObj ? {
    customisation: spaceObj.customisation,
    name: spaceObj.name,
    description: spaceObj.description,
  } : null

  let commentLinks = [].concat.apply([], commentsObj.map(comment => comment.text.match(/<a\shref=.+?<\/a>/g)).filter(links => links))

  let html = template.serveDocHTML.html({
    spaceObj, type, title, url, description,
    content, docObj, similarDocs, commentLinks
  })

  /*let head = '<script type="application/ld+json">\n' +
    '{\n' +
    '  "@context" : "http://schema.org",\n' +
    '  "@type" : "Article",\n' +
    '  "name" : "' + docObj.title + '",\n' +
    '  "headline" : "' + docObj.title + '",\n' +
    '  "datePublished" : "' + new Date(docObj.createdAt).toISOString() + '",\n' +
    '  "articleSection" : "' + docObj.description + '",\n' +
    '  "url" : "https://heystacks.org/doc/' + docObj.id + '/' + docObj.slug + '",\n' +
    '}\n' +
    '</script>'*/
  let head = docObj.upvotes > 0 ? template.serveDocHTML.head({docObj}) : ''
  if (docObj.archived) head += '\n<meta name="robots" content="noindex">\n'

  // Check if doc needs to be archived - <=10 views, upvotes <=10, >1 months
  if (
    !docObj.archived
    && docObj.upvotes <= 10
    && !docObj.hallOfFame
    && (docObj.createdAt < (Date.now() - 31 * 24 * 60 * 60 * 1000))
    && (((Date.now() - docObj.createdAt) / (1000 * 31 * 60 * 60 * 24)) * 3 > docObj.views)
  ) {
    await Document.update({id: docObj.id}).set({archived: true})
    sails.log('Archiving doc ' + docObj.id)
  }

  fs.readFile(app, (err, data) => {
    if (err) sails.log(err)
    let indexTemplate = data.toString()

    indexTemplate = indexTemplate.replace(/xxTITLExx/g, '"' + title + ' - &#x1f7e7;heystacks' + '"')
      .replace('<title>"', '<title>')
      .replace('"</title>', '</title>')
      // .replace('- heystacks</title>', '- &#x1f7e7;heystacks</title>')
    indexTemplate = indexTemplate.replace(/xxDESCRIPTIONxx/g, '"' + description + '"')
    indexTemplate = indexTemplate.replace(/xxKEYWORDSxx/g, '"' + keywords + '"')
    indexTemplate = indexTemplate.replace(/xxURLxx/g, '"' + url + '"')
    indexTemplate = indexTemplate.replace(/xxHTMLxx/g, html)
    indexTemplate = indexTemplate.replace(/xxxHEADxxx/g, head)
    indexTemplate = indexTemplate.replace(/xxMETATHUMBNAILxx/g, '"' + metaThumbnail + '"')

    indexTemplate = indexTemplate.replace(/xxDOCMASTHEADxx/g, template.serveDocHTML.mastHead({docObj}))

    docObj.views = 0
    docObj.hallOfFame = ''

    if (spaceObj) {
      indexTemplate = indexTemplate.replace(/xxBACKGROUNDxx/g,
        (spaceObj.customisation && spaceObj.customisation.colors) ? 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), ' + spaceObj.customisation.colors.color1 + '),linear-gradient(50deg, ' + spaceObj.customisation.colors.color2 + ' 22%, ' + spaceObj.customisation.colors.color3 + ');'
          : 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),linear-gradient(50deg, #072046 22%, #0c400b);')
    }

    // , 'Content-Length': indexTemplate.length
    // res.writeHead(200, {'Content-Type': 'text/html'})
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    res.write(indexTemplate)
    res.end()
  })
}
