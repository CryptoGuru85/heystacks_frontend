module.exports = {


  friendlyName: 'Get content of the document and save to Document object',

  inputs: {
    docId: {
      type: 'number',
    },

    url: {
      type: 'string',
    },

    redirect: {
      type: 'boolean',
      defaultsTo: false
    },

    updateSoDoc: {
      type: 'boolean',
      defaultsTo: false
    }
  },


  fn: async function(inputs) {

    // const https = require('https')
    let https = require('follow-redirects').https
    https.get(inputs.url).on('response', (res) => {
      let content = ''
      res.on('data', (chunk) => {content += chunk})
      res.on('end', async () => {
        if (content
          && !content.includes('<title>Page not found</title>')
          && !content.includes('<title>Error 400 (Bad Request)!!1</title>')
          && !content.includes('<title>Access denied</title>')
          && !content.includes('<title>Too Many Requests</title>')
          && !content.includes('<title>Page Not Found</title>')
          && !content.includes('<title>Google Sheets - create and edit spreadsheets online, for free.</title>')
          && !content.includes('<title>Google Docs - create and edit documents online, for free.</title>')
          && !content.includes('<TITLE>Moved Temporarily</TITLE>')
          && !content.includes('<TITLE>Temporary Redirect</TITLE>')
          && !content.includes('<title>Error')) {
          content = content.slice(0, 10000)
          content = content
            .replace(/\r/g, '')
            .split('\n')
            .filter(chunk => !!chunk.trim())
            .map(para => para.length < 1 ? '<br>' : '<p>' + para.trim() + '</p>')
            .join('\n')
          sails.log('Updating content for doc ' + inputs.docId)
          await Document.update({id: inputs.docId}).set({content: content, contentDate: Date.now()})
          if (inputs.updateSoDoc) await sails.helpers.createSoDoc(inputs.docId)
        } else if (!inputs.redirect && content.includes('<TITLE>Temporary Redirect</TITLE>')) {
          let newUrl = content.match(/The document has moved <A HREF="(.*)">here/)[1]
          await sails.helpers.updateDocContent(inputs.docId, newUrl, true)
        } else {
          await Document.update({id: inputs.docId}).set({contentDate: Date.now()})
          await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: Error getting content ' + inputs.docId, content, content)
        }
      })
    })

  }

};
