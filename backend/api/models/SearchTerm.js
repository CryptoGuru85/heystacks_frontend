/**
 * SearchTerm.js
 *
 * A search term count object
 *
 */

module.exports = {

  attributes: {

    term: {
      type: 'string',
      required: true,
      maxLength: 500,
    },

    count: {
      type: 'number',
      defaultsTo: 0,
    },

  },


}
