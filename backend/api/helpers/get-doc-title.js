module.exports = {


  friendlyName: 'Get title of a document from url metadata',

  inputs: {
    url: {
      type: 'string',
    }
  },


  fn: async function(inputs) {

    return new Promise((resolve) => {
      const https = require('https')
      https.get(inputs.url, (resp) => {
        let data = ''
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          if (data.includes('<H1>Moved Temporarily</H1>')
            || data.includes('<title>Page not found</title>')
            || data.includes('<TITLE>Moved Temporarily</TITLE>')) {
            resolve(['cant-access', ''])
          }
          let meta = data.match(/<title>(.{0,500}?)<\/title>/)
          let mt = data.match(/meta property="og:image" content="(.{0,700}?)">/)
          let metaThumbnail = mt ? mt[1] : ''

          if (!meta) {
            resolve(['!Error: could not load document', ''])
          } else {
            let entities = {
              'amp': '&',
              'apos': '\'',
              '#x27': '\'',
              '#x2F': '/',
              '#39': '\'',
              '#47': '/',
              'lt': '<',
              'gt': '>',
              'nbsp': ' ',
              'quot': '"',
            }

            let replacedEntities = meta[1].replace(/&([^;]+);/gm, function (match, entity) {
              return entities[entity] || match
            })

            let removedHtml = replacedEntities.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '')

            removedHtml = removedHtml.replace(/ - Google Drive$/g, '').replace(/ - Google Sheets$/g, '').replace(/ - Google Slides/g, '').replace(/ - Google Docs$/g, '').replace('.docx', '').replace('.xlsx', '')

            resolve([removedHtml, metaThumbnail])
          }
        })
      }).on('error', (err) => {
        sails.log('Error: ' + err.message)
      })
    })

  }

};
