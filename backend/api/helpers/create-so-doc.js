module.exports = {


  friendlyName: 'Get html version of Google doc and save it as SoDoc',

  inputs: {
    docId: {
      type: 'number',
    },
    force: {
      type: 'boolean'
    }

  },


  fn: async function(inputs) {

    //if (process.env.NODE_ENV !== 'production') return {}
    let docObj = await Document.findOne({ where: { id: inputs.docId }, select: ['url', 'meta', 'contentDate'] })
    if (!docObj.meta) return {}
    if (!docObj.meta.exportLink) return {}

    const downloadFile = async (url, docId, type, modifiedTime) => {
      const https = require('follow-redirects').https
      const fs = require('fs')
      // const { Transform } = require('stream')

      /*const myTransform = new Transform({
        // writableObjectMode: true,
        transform(chunk, encoding, callback) {
          let data = chunk.toString()
          data = data.replace('<body', `<body style="${bodyStyle}"`)
          callback(null, data)
        }
      })*/

      const replaceTextInFile = async (path) => {
        return new Promise((resolve) => {
          fs.readFile(path, 'utf8', async (err, data) => {
            if (err) return sails.log(err)
            /* const cssLastBcgIdx = data.lastIndexOf('"bg_c":"')
            const backgroundColor = data.substring(cssLastBcgIdx, cssLastBcgIdx + 7)
              .replace('"bg_c":"', '')
              .replace(';', '')
              .replace('}', '') */
            const bodyStyle = 'max-width: 100%; overflow-wrap: anywhere; padding:10px; display: inline-block;'
            let result = data.replace('<body',`<body style="${bodyStyle}"`)
            const script =
`document.addEventListener('DOMContentLoaded', function(event) {
  window.parent.postMessage({ 'height': document.body.offsetHeight }, '*')
})
window.addEventListener('resize', function() {
  window.parent.postMessage({ 'height': document.body.offsetHeight }, '*')
})
try {
  console.log(window.parent.location)
  document.getElementsByTagName('html')[0].style.overflow = 'auto'
} catch(e) {
  console.log('iframe')
}
`
            result = result.replace(
              '</head>',
              `<style>
html {overflow: hidden;}
img {max-width: 90vw;height: auto!important;}
span {width: auto!important;}
hr {display: block!important;height: 20px;opacity: 0;}
body > * {line-height: 1.4!important;max-width: 92vw;overflow-wrap: break-word;}
li {line-height: 1.4!important;}
</style>
<script>${script}</script></head>`
            )
            result = result.replace(/<a/g, '<a target="_blank"')
            result = result.replace(/href="#/g, 'hrefa="#')
            await fs.writeFile(path, result, 'utf8', (err) => {
              if (err) return sails.log(err)
              resolve()
            })
          })
        })
      }

      // add s3
      const { v4: uuidv4 } = require('uuid')
      const uid = uuidv4()
      const output = `./.tmp/soDocs/${uid}/index.html`
      await fs.mkdir(`./.tmp/soDocs/${uid}/`, { recursive: true }, (err) => { if (err) return sails.log(err) })
      const file = fs.createWriteStream(output)
      https.get(url).on('response', (res) => {
        file.on('error', (err) => sails.log(err))
        file.on('close', async () => {
          let backgroundColor = 'background-color:#ffffff'
          if (type === 'sheet') {
            // unzip
          } else if (type === 'doc') {
            await replaceTextInFile(output)
          }

          fs.readFile(`./.tmp/soDocs/${uid}/index.html`, async (err, data) => {
            if (err) throw err

            await sails.helpers.uploadToS3('us-east-1', `sodoc-${docObj.id}.html`, 'docs.heystacks.org', 'text/html', data)

            let meta = docObj.meta || {}
            meta.soDoc = `https://docs.heystacks.org/sodoc-${docObj.id}.html`
            meta.soDocBcgColor = backgroundColor
            meta.soUpdate = Date.now()
            meta.modifiedTime = modifiedTime
            await Document.update({id: docObj.id}).set({meta: meta})

            fs.rmdir(`./.tmp/soDocs/${uid}/`, { recursive: true }, (err2) => {
              if (err2) throw err2
              sails.log('SoDoc uploaded to s3')
            })
          })
        })
        res
          // .pipe(myTransform)
          .pipe(file)
      }).on('error', (err) => sails.log(err))
    }

    if (docObj.url.includes('/document/') && (inputs.force || !docObj.meta.soUpdate || (docObj.meta.soUpdate < (Date.now() - 10 * 24 * 60 * 60 * 1000)))) {
      const fileId = docObj.url.match(/\/d\/(?:e\/)?(.*)\//)[1]
      const gDriveData = await sails.helpers.getGdriveData(fileId, 'modifiedTime')

      if (inputs.force || gDriveData.modifiedTime !== docObj.meta.modifiedTime) {
        if (docObj.url.includes('/document/')) {
          sails.log(`Creating soDoc for doc ${docObj.id}`)
          const exportLink = docObj.meta.exportLink.replace('=txt', '=html')
          downloadFile(exportLink, docObj.id, 'doc', gDriveData.modifiedTime)

        } else if (docObj.url.includes('/spreadsheets/')) {
          const exportLink = docObj.meta.exportLink.replace('=tsv', '=zip')

          return {}
        }
      }
    }

    return {}

  }

};
