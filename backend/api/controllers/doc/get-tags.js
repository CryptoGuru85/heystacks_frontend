/**
 * Module dependencies
 */

// ...


/**
 * doc/get-tags.js
 *
 * Get tags.
 */
module.exports = async function getTags(req, res) {

  let sort = 'count DESC'
  let tags
  if (req.body.sort === 'New') sort = 'updatedAt DESC'
  if (req.body.sort === 'Hot') {
      let t1 = await Tag.find({
        limit: 30,
        sort: 'count DESC'
      })
      let t2 = await Tag.find({
        limit: 150,
        skip: 30,
        sort: 'count DESC'
      })
      t1 = t1.sort((a,b) => b.updatedAt - a.updatedAt)
      tags = t1.concat(t2)
  } else {
      tags = await Tag.find({
        limit: 150,
        sort: sort
      })
  }
  return res.send({
    tags: tags
  })

};
