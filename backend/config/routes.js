/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /*'/!*': {
    controller: 'App',
    action: 'serve404',
    skipRegex: /(^\/api\/.*$)|(^\/doc\/.*$)|(^\/sitemap$)/
  },*/

  '/': {
    action: 'app/serve',
  },

  'GET /homepage': {
    view: 'pages/homepage'
  },

  '/hall-of-fame': {
    action: 'app/serve',
  },

  '/teams': {
    action: 'app/serve',
  },

  '/unsubscribe': {
    action: 'app/serve',
  },

  '/comments-unsubscribe': {
    action: 'app/serve',
  },

  '/sitemap': {
    action: 'app/serve-sitemap',
    skipAssets: true,
  },

  'r|^/doc/(\\d+)(/.*)?|docid': {
    action: 'app/serve-doc',
    // action: 'view-doc',
    skipAssets: true,
  },

  'r|^/s/(.*)|spaceName': {
    action: 'app/serve',
    skipAssets: true,
  },

  'POST /api/documents/add': {
    action: 'doc/add-document',
    csrf: false,
  },
  'POST /api/documents/get': {
    action: 'doc/get-documents',
    csrf: false,
  },
  'POST /api/documents/vote': {
    action: 'doc/vote-document',
    csrf: false,
  },
  'POST /api/documents/update': {
    action: 'doc/update-document',
    csrf: false,
  },
  'POST /api/documents/create-thumbnail': {
    action: 'doc/create-thumbnail',
    csrf: false,
  },
  'POST /api/documents/get-meta': {
    action: 'connector/update-and-return-meta',
    csrf: false,
  },
  'POST /api/documents/check-for-content-update': {
    action: 'connector/check-for-content-update',
    csrf: false,
  },
  'POST /api/comments/get': {
    action: 'comment/get-comments',
    csrf: false,
  },
  'POST /api/comments/add': {
    action: 'comment/add-comment',
    csrf: false,
  },
  'POST /api/comments/action': {
    action: 'comment/action-comment',
    csrf: false,
  },
  'POST /api/spaces/get': {
    action: 'space/get-spaces',
    csrf: false,
  },
  'POST /api/spaces/add': {
    action: 'space/add-space',
    csrf: false,
  },
  'GET /api/spaces/callback': {
    action: 'space/space-callback',
    csrf: false,
  },
  'POST /api/tags/get': {
    action: 'doc/get-tags',
    csrf: false,
  },
  'POST /api/action': {
    action: 'doc/action',
    csrf: false,
  },
  'POST /api/notifications/sign-up': {
    action: 'email/notifications',
    csrf: false,
  },
  'POST /api/notifications/unsubscribe': {
    action: 'email/unsubscribe',
    csrf: false,
  },
  'POST /api/notifications/comments-disallow': {
    action: 'email/disallow-comment-notifications',
    csrf: false,
  },
  'POST /api/tips/tipped': {
    action: 'tip/tipped',
    csrf: false,
  },
  'POST /api/tips/crypto': {
    action: 'tip/crypto',
    csrf: false,
  },
  'GET /api/hall-of-fame/get': {
    action: 'fame/get-hall-of-fame',
    csrf: false,
  },
  /*'POST /api/get-auth-url': {
    controller: 'Connector',
    action: 'getGoogleAuthUrl',
    csrf: false,
  },
  'GET /drive-callback': {
    controller: 'Connector',
    action: 'googleDriveCallback',
    csrf: false,
  },
  'GET /drive-picker-callback': {
    controller: 'Connector',
    action: 'drivePickerCallback',
    csrf: false,
  },*/
  /*'GET /api/send-notifications': {
    controller: 'Email',
    action: 'sendNotifications',
    csrf: false,
  },*/
  /*'GET /google/:fileid': {
    controller: 'Connector',
    action: 'checkGoogle',
    csrf: false,
  },*/
  'GET /api/sodoc/:docId': {
    action: 'connector/create-so-doc',
    csrf: false,
  },
  /*'GET /campaign': {
    controller: 'Email',
    action: 'emailCampaign',
    csrf: false,
  },*/

};
