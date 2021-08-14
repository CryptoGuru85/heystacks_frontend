/**
 * Module dependencies
 */
const template = require('../../templates/generate-template')
// ...


/**
 * space/add-space.js
 *
 * Add space.
 */
module.exports = async function addSpace(req, res) {

  if (
    !req.body.name
    || !req.body.description
    || !req.body.emailAddress
    || !req.body.colors.color1
    || !req.body.colors.color2
    || !req.body.colors.color3
  ) {
    return res.send({
      reason: 'incomplete-data',
      success: false,
    })
  }

  if (req.body.name.match(/[^A-Za-z0-9-_]+/g)) {
    return res.send({
      reason: 'name-error',
      success: false,
    })
  }

  if (await Space.count({name: req.body.name}) > 0) {
    sails.log('Tried adding an existing gathering')
    return res.send({
      reason: 'name-duplicate',
      success: false,
    })
  }

  let html = template.spaceHTML.addSpaceEmail({...req.body})
  let message = template.spaceHTML.addSpaceMessage({...req.body})
  await sails.helpers.sendEmail(req.body.emailAddress, '👍 heystacks Gathering Created', message, html, true)
  await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: new Gathering', req.body.name, req.body.name)

  await Space.create({
    name: req.body.name,
    slug: req.body.name,
    description: req.body.description,
    owners: [{emailAddress: req.body.emailAddress, nickname: req.body.emailAddress[0]}],
    customisation: {
      colors: {
        color1: req.body.colors.color1,
        color2: req.body.colors.color2,
        color3: req.body.colors.color3,
      }
    }
  })

  return res.send({
    success: true,
  })

};
