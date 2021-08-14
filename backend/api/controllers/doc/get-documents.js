/**
 * Module dependencies
 */

// ...


/**
 * doc/get-documents.js
 *
 * Get documents.
 */
module.exports = async function getDocuments(req, res) {

  // let mode = {and: []}
    // let mode = {and: [{or: [{title: {contains: req.body.search || ''}}, {description: {contains: req.body.search || ''}}]}]}
    // mode.and.push((req.body.tags || []).map(tag => ({tags: {contains: '"' + tag + '"'}})))

    let mode = {}
    if (req.body.tags && req.body.tags.length) {
      sails.log('Tags: '+ req.body.tags)
      mode = {
        and: req.body.tags.map(tag => ({
          tags: {contains: '\'' + tag + '\''}
        }))
      }
    }

    if (req.body.space) {
      if (!mode.and) mode.and = []
      mode.and.push({spacesArr: {contains: '"' + req.body.space + '"'}})
    }

    if (req.body.search) {
      sails.log('Search: '+ req.body.search)
      if (!mode.and) mode.and = []
      let queryArr = []
      let words = req.body.search.replace(/\"/g, '').split(' ')
      const stopWords = [
        'i', 'it', 'what', 'which', 'who', 'whom', 'am', 'is', 'are', 'was', 'were', 'be', 'have','has', 'had', 'do',
        'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'as', 'of', 'at', 'by', 'for', 'with',
        'about', 'to', 'from', 'up', 'in', 'out', 'on', 'why', 'how', 'all', 'any', 'no', 'so', 'too', 'new', 'free',
        '?', '.', ',', '&', '\'',
      ]
      words = words.filter(word => stopWords.indexOf(word.toLowerCase()) < 0)
      words = words.concat(req.body.search.split('"').filter((e, i) => (i & 1)))
      if (!words.length) words = req.body.search.split(' ')
      if (req.body.searchOption === 'Tags' || req.body.searchOption === 'Everything')
        queryArr.push({and: words.map(word => ({tags: {contains: word}}))})
      if (req.body.searchOption === 'Documents' || req.body.searchOption === 'Everything')
        queryArr.push(
          {and: words.map(word => ({title: {contains: word}}))},
          {and: words.map(word => ({description: {contains: word}}))},
          {and: words.map(word => ({content: {contains: word}}))}
        )
      mode.and.push({or: queryArr})

      let terms = [...new Set(req.body.search.replace(/\"/g, '').split(' ').filter(term => term))]
      terms = terms.concat(req.body.search.split('"').filter((e, i) => (i & 1)))
      terms.forEach(async term => {
        let t = term.toLowerCase().trim()
        let searchTermObj = await SearchTerm.find({term: t})
        if (searchTermObj && searchTermObj.length) {
          await SearchTerm.update({term: t}).set({count: searchTermObj[0].count + 1})
        } else {
          await SearchTerm.create({term: t, count: 1})
        }
      })
    }

    let sortMode
    if (req.body.sort === 'Hot') {
      sortMode = [
        { hotScore: 'DESC' },
        { createdAt: 'DESC' },
      ]
    } else if (req.body.sort === 'Best') {
      sortMode = [
        { upvotes: 'DESC' },
        { createdAt: 'DESC' },
      ]
    } else if (req.body.sort === 'New') {
      sortMode = [
        { createdAt: 'DESC' },
        { upvotes: 'DESC' },
      ]
    }

    if (!mode.and) mode.and = []
    if (req.body.type === 'docs') mode.and.push({url: {contains: 'document'}})
    if (req.body.type === 'sheets') mode.and.push({url: {contains: 'spreadsheet'}})
    if (req.body.type === 'slides') mode.and.push({url: {contains: 'presentation'}})
    if (req.body.id) mode.and.push({id: req.body.id})

    const pageSize = 10
    let documentsObj = await Document.find({
      where: mode,
      limit: pageSize,
      skip: (req.body.page || 0) * pageSize,
      sort: sortMode,
      select: ['createdAt', 'updatedAt', 'id', 'title', 'slug', 'url', 'description', 'tags', 'upvotes', 'views', 'meta', 'permissions', 'allowNotifications', 'hallOfFame', 'archived', 'ads', 'spacesArr']
    }).populate('comments')

    let pageCount = 5
    if (req.body.search || (req.body.type !== 'all') || (req.body.tags && req.body.tags.length) || req.body.space) {
      pageCount = Math.ceil((await Document.count({where: mode})) / pageSize)
    }

    let remindingTags = []
    // remindingTags = [...new Set(remindingTags)]
    if (req.body.type !== 'all' || req.body.search || req.body.tags.length) {
      let tagsObj = await Document.find({where: mode, select: ['tags']})
      tagsObj.forEach(doc => remindingTags = remindingTags.concat(doc.tags.split(', ')))
      let tagsCounts = remindingTags.reduce((obj, val) => {
        obj[val] = (obj[val] || 0) + 1
        return obj
      }, {})
      remindingTags = Object.keys(tagsCounts).map(key => {
        return {title: key.replace(/\'/g, ''), count: tagsCounts[key]}
      })
      remindingTags = remindingTags.sort((a, b) => b.count - a.count)
    }

    if (req.body.id) await Document.update({id: documentsObj[0].id}).set({views: (documentsObj[0].views || 0) + 1})
    let similarDocs = []
    if (req.body.id) {
      const findSimilar = async (nTags) => {
        return await Document.find({
          where: {and: [{
              and: documentsObj[0].tags.split(', ').slice(0, nTags).map(t => ({tags: {contains: t.replace(/\'/g, '')}}))
            }, {id: {'!=': documentsObj[0].id}}, {archived: false}]},
          limit: 4,
          sort: [{upvotes: 'DESC'}],
          select: ['id', 'slug', 'title', 'url']
        })
      }
      similarDocs = await findSimilar(3)
      if (similarDocs.length <= 0) similarDocs = await findSimilar(2)
      if (similarDocs.length <= 0) similarDocs = await findSimilar(1)
    }

    documentsObj.forEach(doc => {
      doc.comments = doc.comments.length
      doc.permissions = doc.permissions ? {
        canEdit: doc.permissions.canEdit,
        canComment: doc.permissions.canComment
      } : {}
      doc.spacesArr = JSON.parse(doc.spacesArr)
    })

    return res.send({
      success: true,
      pageCount: pageCount,
      documents: documentsObj,
      remindingTags: remindingTags,
      similarDocs: similarDocs,
    })

};
