module.exports = {


  friendlyName: 'Get meta of the document and save to Document object',

  inputs: {
    docId: {
      type: 'number',
    },

    fileId: {
      type: 'string',
    },

    meta: {
      type: {},
    },
  },


  fn: async function(inputs) {

    const fileId = inputs.fileId
    const docId = inputs.docId
    let gDriveData = await sails.helpers.getGdriveData(fileId, '*, sharingUser, lastModifyingUser, createdTime, modifiedTime, thumbnailLink, thumbnailVersion, version, exportLinks')
    if (!gDriveData.createdTime) {
      await sails.helpers.sendEmail(process.env.alertEmail, 'HEYSTACKS: Error getting meta', docId, docId)
    }
    let exportLink = ''
    if (gDriveData.exportLinks) {
      let docText = gDriveData.exportLinks['text/plain']
      let sheetText = gDriveData.exportLinks['text/tab-separated-values']
      exportLink = docText || sheetText
    }
    let meta = inputs.meta
    meta.fileId = fileId
    meta.lastUpdate = Date.now()
    meta.createdTime = gDriveData.createdTime || meta.createdTime
    meta.modifiedTime = gDriveData.modifiedTime || meta.modifiedTime
    meta.thumbnailLink = gDriveData.thumbnailLink || meta.thumbnailLink
    meta.thumbnailVersion = gDriveData.thumbnailVersion || meta.thumbnailVersion
    meta.exportLink = gDriveData.exportLinks ? (gDriveData.exportLinks['text/plain'] || gDriveData.exportLinks['text/tab-separated-values']) : ''
    meta.version = gDriveData.version || meta.version

    await Document.update({ id: docId }).set({
      meta,
      permissions: {
        owner: gDriveData.owners.concat(gDriveData.owner),
        sharingUser: gDriveData.sharingUser || {},
        lastModifyingUser: gDriveData.lastModifyingUser,
        canComment: gDriveData.capabilities.canComment,
        canEdit: gDriveData.capabilities.canEdit,
      }
    })

    let owner = (gDriveData.owner && gDriveData.owner.length) ? gDriveData.owner[0] : gDriveData.owners[0]

    return {
      exportLink,
      owner
    }
  }

};
