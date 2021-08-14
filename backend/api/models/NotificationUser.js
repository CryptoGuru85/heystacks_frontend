/**
 * NotificationUser.js
 *
 * An emailAddress for people who receive fortnightly document notifications
 *
 */

module.exports = {

  attributes: {

    id: {
      type: 'number',
      autoIncrement: true,
    },

    emailAddress: {
      type: 'string',
    },

    active: {
      type: 'boolean',
      defaultsTo: true,
    },

    frequency: {
      type: 'number',
      defaultsTo: 7,
    },

  },


}
