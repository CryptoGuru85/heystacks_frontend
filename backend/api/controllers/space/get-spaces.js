/**
 * Module dependencies
 */

// ...


/**
 * space/get-spaces.js
 *
 * Get spaces.
 */
module.exports = async function getSpaces(req, res) {

  let query = {
    sort: 'upvotes DESC',
    select: ['id', 'name', 'slug', 'description', 'customisation']
  }
  if (req.body.slug) {
    query.where = {slug: req.body.slug}
  }
  if (req.body.docId) {
    let docObj = await Document.findOne({ where: { id: req.body.docId }, select: ['spacesArr'] })
    const spacesArr = JSON.parse(docObj.spacesArr)
    if (!spacesArr.length) return res.send({
      success: true,
      spaces: [{}],
    })
    query.where = {slug: spacesArr[0]}
  }
  let spaceObj = await Space.find(query)

  return res.send({
    success: true,
    spaces: spaceObj,
  })

};
