/**
 * Tag.js
 *
 * A tag count object
 *
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      maxLength: 100,
    },

    count: {
      type: 'number',
      defaultsTo: 1,
    },

  },


}
