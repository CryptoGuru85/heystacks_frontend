/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * app/serve.js
 *
 * Serve app.
 */

module.exports = async function serve(req, res) {
  const fs = require('fs')
  sails.log(req.url)
  let serverSideRender = 'index.html'
  if (req.url.includes('/teams')) serverSideRender = 'index-teams.html'
  if (req.url.includes('/s/')) serverSideRender = 'index-space.html'
  if (req.query.sort === 'Best') serverSideRender = 'index-best.html'
  if (req.query.sort === 'Hot') serverSideRender = 'index-hot.html'
  if (req.query.sort === 'New') serverSideRender = 'index-new.html'
  if (req.query.tags) serverSideRender = 'index-tag.html'
  if (req.query['page-type'] && req.query['page-type'] === 'add-document') serverSideRender = 'index-submit.html'

  let spaceObj
  if (req.url.includes('/s/')) {
    let spaceName = req.param('spaceName')
    spaceObj = await Space.findOne({name: spaceName})
    if (!spaceObj) return res.redirect(301, '/?error=document-doesnt-exist')
  }

  const indexFileName = (serverSideRender === 'index-teams.html' || serverSideRender === 'index-space.html') ? serverSideRender : 'index.html'
  const app = __dirname + '/../../assets/' + indexFileName
  res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})

  // fs.createReadStream(app).pipe(res)
  fs.readFile(app, async (err, data) => {
    if (err) sails.log(err)
    let indexTemplate = data.toString()

    let meta = {
      title: {
        index: 'heystacks 🟧',
        best: 'Best Docs - 🟧 heystacks',
        hot: 'Hot Docs - 🟧 heystacks',
        new: 'New Docs - 🟧 heystacks',
        submit: 'Submit a New Doc - 🟧 heystacks',
        tag: 'heystacks 🟧',
      },
      description: {
        index: 'Discover the best public Google docs',
        best: 'The highest-rated docs on heystacks',
        hot: 'Today\'s most popular docs',
        new: 'Most recent docs on heystacks',
        submit: 'Share a link to a public Google doc',
        tag: 'Discover the best public Google docs',
      },
      keywords: {
        index: 'Google, Google Docs, Google Sheets, wiki, google drive, google drive wiki, Excel, documents, document, spreadsheet, presentation, Online, learn, public, open data, open knowledge, crowd, crowdsource, community, public documents, collaboration',
        best: 'Top rated, highest-rated, highest rated, documents, docs, Google, Google Docs, Google Sheets, Excel, Online, learn, public, open data, open knowledge, community, public documents, collaboration',
        hot: 'Hot, documents, document, spreadsheet, presentation, docs, Google, Google Docs, Google Sheets, Excel, Online, learn, public, open data, open knowledge, community, public documents, collaboration',
        new: 'most recent, new, fresh, documents, document, spreadsheet, presentation, Google, Google Docs, Google Sheets, Excel, Online, learn, public, open data, open knowledge, community, public documents, collaboration',
        submit: 'share, link, submit, add, documents, Google, Google Docs, Google Sheets, Excel, Online, learn, public, open data, open knowledge, community, public documents, collaboration',
        tag: 'Google, Google Docs, Google Sheets, wiki, google drive, google drive wiki, Excel, documents, document, spreadsheet, presentation, Online, learn, public, open data, open knowledge, crowd, crowdsource, community, public documents, collaboration',
      },
    }

    let tagsClean = ''
    let tagsStr = ''
    if (serverSideRender === 'index-tag.html') {
      try {
        tagsClean = req.query.tags.replace(/<[^>]*>?/gm, '')
        tagsStr = decodeURI(req.query.tags).replace(/\,/g, ', ').replace(/<[^>]*>?/gm, '')
      } catch (err) {
        sails.log(err)
        tagsClean = ''
        tagsStr = ''
      }
      tagsStr = (await Promise.all(tagsStr.split(', ').map(async tag => {
        return await sails.helpers.getTagEmoji(tag)
      }))).join(', ')
      meta.description.tag = '🏷️ heystacks documents about ' + tagsStr
      tagsStr = tagsStr.charAt(0).toUpperCase() + tagsStr.slice(1)
      meta.title.tag = tagsStr + ' - &#x1f7e7;heystacks'
      meta.keywords.tag = tagsStr + ', Google, Google Docs, Google Sheets, wiki, google drive, google drive wiki, Excel, Online, learn, public, open data, open knowledge, community, public documents, collaboration'
    }

    let indexQuery = {sort: [{'hotScore': 'DESC'}, {'createdAt': 'DESC'}], limit: 10}
    const pageType = serverSideRender.replace('index-', '').replace('.html', '')
    let canonical = 'https://heystacks.org'
    if (serverSideRender === 'index-teams.html') canonical += '/teams'
    if (serverSideRender === 'index-hot.html') canonical += '/?sort=Hot'
    if (serverSideRender === 'index-submit.html') canonical += '/?page-type=add-document'
    if (serverSideRender === 'index-best.html') {
      canonical += '/?sort=Best'
      indexQuery = {sort: [{'upvotes': 'DESC'}, {'createdAt': 'DESC'}], limit: 10}
    }
    if (serverSideRender === 'index-new.html') {
      canonical += '/?sort=New'
      indexQuery = {sort: [{'createdAt': 'DESC'}], limit: 10}
    }
    if (serverSideRender === 'index-tag.html') {
      canonical += '/?tags=' + tagsClean
      let and = tagsClean.split(',').map(tag => ({
        tags: {contains: '\'' + tag.trim() + '\''}
      }))
      indexQuery = {where: {and}, sort: [{'hotScore': 'DESC'}, {'createdAt': 'DESC'}], limit: 10}
    }
    if (serverSideRender === 'index-space.html') {
      canonical += '/s/' + req.param('spaceName')
      meta.title.index = req.param('spaceName')
      indexQuery = {where: {spacesArr: {contains: '"' + spaceObj.name + '"'}}, sort: [{'hotScore': 'DESC'}, {'createdAt': 'DESC'}], limit: 10}
      indexTemplate = indexTemplate.replace(/xxBACKGROUNDxx/g,
        (spaceObj.customisation && spaceObj.customisation.colors) ? 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), ' + spaceObj.customisation.colors.color1 + '),linear-gradient(50deg, ' + spaceObj.customisation.colors.color2 + ' 22%, ' + spaceObj.customisation.colors.color3 + ');'
          : 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074449),linear-gradient(50deg, #072046 22%, #0c400b);')
      indexTemplate = indexTemplate.replace(/xxSPACE-NAMExx/g, spaceObj.name)
      indexTemplate = indexTemplate.replace(/xxSPACE-DESCRIPTIONxx/g, spaceObj.description)
    }


    if (serverSideRender === 'index.html') {
      if (req.query.type === 'sheets') {
        meta.title.index = 'Google Sheets - &#x1f7e7;heystacks'
        canonical = 'https://heystacks.org/?type=sheets'
      }
      if (req.query.type === 'docs') {
        meta.title.index = 'Google Docs - &#x1f7e7;heystacks'
        canonical = 'https://heystacks.org/?type=docs'
      }
      if (req.query.type === 'slides') {
        meta.title.index = 'Google Slides - &#x1f7e7;heystacks'
        canonical = 'https://heystacks.org/?type=slides'
      }
      if (req.url.includes('/hall-of-fame')) {
        meta.title.index = 'Hall of fame - &#x1f7e7;heystacks'
        canonical = 'https://heystacks.org/hall-of-fame'
      }
    }

    indexTemplate = indexTemplate.replace(/xxTITLExx/g, `"${meta.title[pageType]}"`)
    indexTemplate = indexTemplate.replace('title>"', 'title>').replace('"</title', '</title')
    indexTemplate = indexTemplate.replace(/xxDESCRIPTIONxx/g, `"${meta.description[pageType]}"`)
    indexTemplate = indexTemplate.replace(/xxKEYWORDSxx/g, `"${meta.keywords[pageType]}"`)
    indexTemplate = indexTemplate.replace(/xxCANONICALxx/g, canonical)

    if (req.url === '/hall-of-fame') {
      indexQuery = null
      let docObj = await Document.find({where: {hallOfFame: {'!=': ''}}, select: ['hallOfFame', 'id', 'url', 'title', 'description', 'slug', 'tags', 'spacesArr']})
      let hallOfFameObj = {}
      //{place: 3, month: "May", year: 2020}
      docObj.forEach(doc => {
        doc.hallOfFame.forEach(award => {
          const yearMonth = `${award.year}-${award.monthIdx}`
          if (!hallOfFameObj[yearMonth]) hallOfFameObj[yearMonth] = {
            monthIdx: award.monthIdx,
            month: award.month,
            year: award.year,
            docs: []
          }
          doc.tags = doc.tags.split(', ').map(tag => tag.replace(/\'/g, ''))
          doc.spacesArr = JSON.parse(doc.spacesArr)
          hallOfFameObj[yearMonth].docs.push({place: award.place, doc: doc})
        })
      })

      let hallOfFameArr = Object.keys(hallOfFameObj).map(yearMonth => hallOfFameObj[yearMonth])
      hallOfFameArr = hallOfFameArr.sort((a, b) => b.monthIdx - a.monthIdx)
      hallOfFameArr.forEach(month => month.docs = month.docs.sort((a, b) => a.place - b.place))

      let html = '<div>' + docObj.map(doc => '<h3><a href="https://heystacks.org/doc/' + doc.id + '/' + doc.slug + '" title="' + doc.title + '">' + doc.title + '</a></h3>').join('\n') + '</div>' +
        '<div id="ssr-data-div" style="display: none;" data-json="' +
        JSON.stringify({ hallOfFame: true, months: hallOfFameArr} ).replace(/\"/g, '&quot;') +
        '"></div>'
      indexTemplate = indexTemplate.replace(/xxHTMLxx/g, html)
    }

    if (indexQuery) {
      indexQuery.select = ['id', 'title', 'url', 'slug', 'description', 'tags', 'createdAt', 'upvotes', 'spacesArr', 'archived']

      let docObj = await Document.find(indexQuery)
      if (serverSideRender !== 'index-tag.html' && serverSideRender !== 'index-space.html' && !docObj.length) {
        indexQuery.where = {and: []}
        indexQuery.where.and = indexQuery.where.and.filter(f => !f.createdAt)
        docObj = await Document.find(indexQuery)
      }
      let tagsObj
      let sort = 'count DESC'
      if (serverSideRender === 'index-new.html') sort = 'updatedAt DESC'
      if (!req.query.type && !req.query.tags) {
        tagsObj = await Tag.find({
          limit: 30,
          sort: sort
        })
        if (serverSideRender === 'index.html') tagsObj = tagsObj.sort((a, b) => b.updatedAt - a.updatedAt)
      }

      let ssrObj = {
        tagsObj: tagsObj || [],
        spaceObj: spaceObj ? {
          customisation: spaceObj.customisation,
          name: spaceObj.name,
          description: spaceObj.description,
        } : null
      }

      let html = template.serveHTML({
        serverSideRender, meta, pageType,
        tagsClean, doc: docObj, tagsStr,
        ssr: ssrObj
      })
      indexTemplate = indexTemplate.replace(/xxHTMLxx/g, html)
      if (serverSideRender === 'index-tag.html') {
        indexTemplate = indexTemplate.replace('xxxheadxxx', docObj.length < 3 ? ' name="robots" content="noindex"' : '')
      }
    }
    // , 'Content-Length': indexTemplate.length
    res.write(indexTemplate)
    res.end()
  })
}