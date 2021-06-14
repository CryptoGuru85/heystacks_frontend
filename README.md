# heystacks web application

Discover the best public Google docs

###### Front-end
vue3, vue-router, vuex, tailwind css
###### Back-end
sails.js, mysql, redis, mailgun, aws s3, googleapis, bitcoinjs 

### To start

###### Front-end
```
cd backend
npm install
npm run start
```
Now a node.js server is running on port 1337. It uses diskDb which should automatically create schema and be ready to use.

###### Back-end
```
cd frontend
npm install
npm run serve
```
Now a vue.js development application is running on http://localhost:8080

You should be able to view feed page, hall-of-fame page, everything styled. You won't be able to add docs yet, as you need to set up some of the env environment variables:
```
// Google Drive keys:  
googleClientId
googleProjectId
googleClientSecret
googleAccessToken
googleRefreshToken

// Emailing keys:
alertEmail
mailgunKey
mailgunDomain
homePath

// Twitter keys:
twitterKey
twitterSecret
twitterTokenKey
twitterTokenSecret

// AWS S3 keys:
s3KeyId
s3AccessKey

// Database keys:
dbAdapter
dbUrl

// Node key:
NODE_ENV
```

### To do

###### Front-end
1. Front-end application needs to be update to Vue3
* packages and dependencies versions
* Vue components need to be refactored to Vue3 composition style and using Typescript
* Vuex version 4
* any other changes needed for the new vue version
2. Vuetify layout library needs to be replaced with Tailwind CSS
* existing styles should be retained as much as possible
* new classes, theme variables, etc. created in Tailwind
3. Component and views list is quite long now, they should be organised into folders

###### Back-end
1. Api/controllers/..Controller.js files have a lot of "actions" in them. They should be divided into separate files in separate folders
2. There is a lot of manual html and text injection inside controllers. Those snippets should be moved out to separate folders/files and imported as needed. E.g. EmailController line 19 - this html should be in a separate file, preferably as a template. 