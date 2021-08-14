/**
 * Module dependencies
 */

// ...


/**
 * connector/create-so-doc.js
 *
 * Create so doc.
 */
module.exports = async function createSoDoc(req, res) {

  await sails.helpers.createSoDoc(req.param('docId'), true)

    return res.send({
    })

};
