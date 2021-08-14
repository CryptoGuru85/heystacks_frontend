/**
 * Module dependencies
 */

// ...


/**
 * connector/check-google.js
 *
 * Check google.
 */
module.exports = async function checkGoogle(req, res) {

  let gDriveData = await sails.helpers.getGdriveData(req.param('fileid'), '*, sharingUser, lastModifyingUser')

    /*console.log(gDriveData.owner)
    console.log(gDriveData.sharingUser)
    console.log(gDriveData.lastModifyingUser)*/

    console.log('Can comment: ' + gDriveData.capabilities.canComment)
    console.log('Can edit: ' + gDriveData.capabilities.canEdit)

    /*let gRes2 = await drive.permissions.get({
      auto: oAuth2Client,
      fileId: fileId,
      permissionId: gRes.data.owners[0].permissionId,
      fields: '*'
    }).catch(err => sails.log(err))

    console.log(gRes2.data)*/
    /*gRes = await drive.revisions.list({
      auto: oAuth2Client,
      fileId: fileId,
    }).catch(err => sails.log(err))

    gRes.data.revisions.forEach(async rev => {
      let revRes = await drive.revisions.get({
        auto: oAuth2Client,
        fileId: fileId,
        fields: '*, lastModifyingUser',
        revisionId: rev.id,
      }).catch(err => sails.log(err))
      revRes.data.exportLinks = {}
      console.log(revRes.data)
    })*/

    return res.send({
      success: true,
      user: gDriveData.lastModifyingUser,
      owner: gDriveData.owner,
      owners: gDriveData.owners,
    })

    /*let code = this.req.param('code')
    const {tokens} = await oAuth2Client.getToken(code)*/


};
