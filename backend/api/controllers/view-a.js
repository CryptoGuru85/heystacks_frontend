module.exports = {


  friendlyName: 'View signup',


  description: 'Display "Signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    const fs = require('fs')

    const app = __dirname + '/../../assets/index.html'

    fs.readFile(app, function(err,data) {
      if (err) sails.log(err)
      else
        return exits.success({
          vueApp: data.toString()
            .replace('<!DOCTYPE html><html><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,user-scalable=yes"><title>Heystacks</title>', '')
            .replace('</body></html>', '')
        })
    })


  }


};
