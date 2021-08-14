/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * doc/create-thumbnail.js
 *
 * Create thumbnail.
 */
module.exports = async function createThumbnail(req, res) {

  if (!req.body.docId) {
    return res.send({
      success: false,
    })
  }

  let docObj = await Document.findOne({where: {id: req.body.docId}, select: ['url', 'title', 'description', 'meta', 'contentDate', 'spacesArr']})

  if (docObj.meta && (!docObj.meta.metaThumbnail || !docObj.meta.metaThumbnail.includes('heystacks-public') || req.body.override)) {
    sails.log('Creating thumbnail for doc ' + req.body.docId)

    const nodeHtmlToImage = require('node-html-to-image')

    const shortenText = (text, len) => {
      const firstSentence = text.split('.')[0]
      return firstSentence.slice(0, len) + (firstSentence.length > len ? '...' : '')
    }
    const title = req.body.title || shortenText(docObj.title, 60)
    const description = req.body.description || shortenText(docObj.description, 135)
    const type = docObj.url.includes('document') ? 'docs' : docObj.url.includes('presentation') ? 'slides' : 'sheets'
    let spaceObj
    const spacesArr = JSON.parse(docObj.spacesArr)
    let backgroundCss = 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), #074246),linear-gradient(50deg, #073746 22%, #074620);'
    if (spacesArr.length) {
      spaceObj = await Space.findOne({slug: spacesArr[0]})
      if (spaceObj && spaceObj.customisation && spaceObj.customisation.colors)
        backgroundCss = 'background-image: linear-gradient(180deg, rgba(7, 68, 73, 0.3), ' + spaceObj.customisation.colors.color1 + '),linear-gradient(50deg, ' + spaceObj.customisation.colors.color2 + ' 22%, ' + spaceObj.customisation.colors.color3 + ');'
    }

    const docIcon = type === 'sheets' ?
      '          <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>\n' +
      '          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#0F9D58" stroke="none">\n' +
      '            <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m280 180 l0 -70 145 0 145 0 0 -35 0 -35 -145 0 -145 0 0 -145 0 -145 -35 0 -35 0 0 145 0 145 -70 0 -70 0 0 35 0 35 70 0 70 0 0 70 0 70 35 0 35 0 0 -70z"></path>\n' +
      '          </g>\n' : type === 'slides' ?
      '          <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>\n' +
      '          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#F4B400" stroke="none">\n' +
      '            <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z m570 0 l0 -140 -250 0 -250 0 0 140 0 140 250 0 250 0 0 -140z"/>\n' +
      '          </g>\n' :
      '          <rect x="5" y="5" width="55" height="55" style="fill: white;"></rect>\n' +
      '          <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#4285F4" stroke="none">\n' +
      '            <path d="M 0.648 639.352 L 0.648 1.409 L 639.352 0.648 L 639.352 639.352 L 0.648 639.352 Z M 500 465 L 500 430 L 320 430 L 140 430 L 140 465 L 140 500 L 320 500 L 500 500 L 500 465 Z M 500 325 L 500 290 L 320 290 L 140 290 L 140 325 L 140 360 L 320 360 L 500 360 L 500 325 Z M 390 185 L 390 150 L 265 150 L 140 150 L 140 185 L 140 220 L 265 220 L 390 220 L 390 185 Z"></path>\n' +
      '          </g>\n'

      nodeHtmlToImage({
      output: '.tmp/auto-' + req.body.docId + '.png',
      // type: 'jpeg',
      html: template.docHTML.docThumbnail({backgroundCss, docIcon, title, description})
    })
      .then(async () => {
        sails.log('The thumbnail was created successfully')

        if (process.env.NODE_ENV === 'production') {
          const fs = require('fs')
          fs.readFile('.tmp/auto-' + req.body.docId + '.png', async (err, data) => {
            if (err) throw err

            await sails.helpers.uploadToS3('eu-west-2', `auto-${req.body.docId}.png`, 'heystacks-public', 'image/png', data)

            let meta = docObj.meta || {}
            if (meta.metaThumbnail && !req.body.override) meta.metaThumbnailOld = meta.metaThumbnail
            meta.metaThumbnail = 'https://heystacks-public.s3.eu-west-2.amazonaws.com/auto-' + req.body.docId + '.png'
            await Document.update({id: req.body.docId}).set({meta: meta})

            fs.unlink('.tmp/auto-' + req.body.docId + '.png', (err3) => {
              if (err3) {
                sails.log(err3)
                throw err3
              }
              sails.log('Thumbnail uploaded to s3')
            })
          })
        }
      })
  }

  return res.send({success: true})

};
