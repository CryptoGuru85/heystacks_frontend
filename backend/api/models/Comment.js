/**
 * Comment.js
 *
 * A comment object
 *
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
    },

    text: {
      type: 'string',
    },

    nickname: {
      type: 'string',
      maxLength: 100,
    },

    emailAddress: {
      type: 'string',
      maxLength: 150,
      allowNull: true,
    },

    upvotes: {
      type: 'number',
      defaultsTo: 0,
    },

    replyTo: {
      type: 'number',
      defaultsTo: -1,
    },

    document: {
      model: 'document',
    },

  },


}
