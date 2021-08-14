/**
 * Document.js
 *
 * A review object
 *
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true,
      maxLength: 500,
    },

    slug: {
      type: 'string',
      maxLength: 500,
    },

    url: {
      type: 'string',
      required: true,
      maxLength: 500,
    },

    description: {
      type: 'string',
      required: true,
      maxLength: 1000,
    },

    tags: {
      type: 'string',
      maxLength: 500,
      defaultsTo: '',
    },

    upvotes: {
      type: 'number',
      defaultsTo: 0,
    },

    views: {
      type: 'number',
      defaultsTo: 0,
    },

    readeds: {
      type: 'number',
      defaultsTo: 0,
    },

    clicks: {
      type: 'number',
      defaultsTo: 0,
    },

    permissions: {
      type: 'json',
    },

    meta: {
      type: 'json',
    },

    // alter table document add column payments json after meta
    payments: {
      type: 'json',
    },

    comments: {
      collection: 'comment',
      via: 'document',
    },

    allowNotifications: {
      type: 'boolean',
      defaultsTo: true,
    },

    hallOfFame: {
      type: 'json',
      description: 'e.g. {place: 3, month: "May", monthIdx: 4, year: 2020}'
    },

    contentDate: {
      type: 'number',
      allowNull: true
    },

    content: {
      type: 'string',
      defaultsTo: '',
      allowNull: true
    },

    spacesArr: {
      type: 'string',
      defaultsTo: '[]',
      description: 'e.g. ["1", "3"]'
    },

    archived: {
      type: 'boolean',
      defaultsTo: false,
    },

    ads: {
      type: 'boolean',
      defaultsTo: false,
    },

    allowForks: {
      type: 'boolean',
      defaultsTo: false,
    },

    forks: {
      type: 'json',
      description: 'e.g. { original: "", arr: [{ emailAddress: "", id: "" }] }'
    },

    dateNow: {
      type: 'number',
      autoCreatedAt: true,
    },

    hotScore: {
      type: 'number',
      // columnType: 'float GENERATED ALWAYS AS (LEAST((1 / ((dateNow - createdAt) / 1000 / 60 / 60 / 24)), 1) * (upvotes + 1))',
      allowNull: true
      // columnType: 'float',
      // allowNull: true
    },


  },


}
