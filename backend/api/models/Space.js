/**
 * Document.js
 *
 * A review object
 *
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 500,
    },

    slug: {
      type: 'string',
      maxLength: 500,
    },

    description: {
      type: 'string',
      required: true,
      maxLength: 1000,
    },

    upvotes: {
      type: 'number',
      defaultsTo: 0,
    },

    owners: {
      type: 'json',
      description: '[{"emailAddress": "x", "nickname": "y"}]'
    },

    customisation: {
      type: 'json',
      description: 'e.g. {bannerColor: "red", year: 2020}'
    },


  },


}
