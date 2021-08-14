/**
 * Module dependencies
 */

// ...


/**
 * app/serve-sitemap.js
 *
 * Serve sitemap.
 */
const template = require('../../templates/generate-template') 

module.exports = async function serveSitemap(req, res) {

  let todayDate = new Date()
  let today = todayDate.getFullYear() + '-' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' + ('0' + todayDate.getDate()).slice(-2)
  let docsObj = await Document.find({where: {archived: false}, sort: 'updatedAt DESC'})
  let tagsObj = await Tag.find({where: {count: {'>=': 3}}, sort: 'count DESC', limit: 10})

  let sitemapXml = template.sitemap({today, docs: docsObj, tags: tagsObj})
  // const sitemapFile = __dirname + '/../../assets/sitemap.xml'
  res.type('application/xml')
  res.set('Content-Type', 'text/xml');
  res.send(sitemapXml)
}

