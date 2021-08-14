module.exports = {


  friendlyName: 'Upload to s3 bucket',

  inputs: {
    region: {
      type: 'string',
    },
    key: {
      type: 'string',
    },
    bucket: {
      type: 'string',
    },
    contentType: {
      type: 'string',
    },
    data: {
      type: 'ref',
    }

  },


  fn: async function(inputs) {

    const aws = require('aws-sdk')
    const s3 = new aws.S3({
      region: inputs.region,
      accessKeyId: process.env.s3KeyId,
      secretAccessKey: process.env.s3AccessKey
    })
    return s3.upload({
      region: inputs.region,
      Key: inputs.key,
      Bucket: inputs.bucket,
      ACL: 'public-read',
      ContentType: inputs.contentType,
      Body: inputs.data
    }, (err) => {
      if (err) sails.log(err)
    })

  }

};
