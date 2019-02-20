# Stumbl

Stumble application built in Vue.js and Go by Skookum Denver.

>**Check out [this project's Wiki](https://github.com/Skookum/stumbl-2019/wiki) for thorough project information!**

## Purpose

Stumbl is a simple SPA to be used by attendees of [Denver Startup Week](https://www.denverstartupweek.org/) to improve information discovery, increase attendee engagement, and increase visibility for sponsors.  Stumbl will allow users to view venue and session information.  It will also allow venues to manage the information presented to users about their business, giving them further control over their image.

[2017 Version](https://stmbl.herokuapp.com)

# Development

## Run the application


```
1. clone this repository
2. npm install
3. start web project using docker
docker-compose up stumbl-web

4. open http://localhost:8080/

5. stop web project
docker-compose down stumbl-web
```

Alternatively, there have been npm scripts created for starting/stopping docker.
```
npm run start (docker-compose up)

npm run stop (docker-compose down)
```

## Run the Unit Tests

```
npm run test:unit
```

## Run the e2e Tests

```
npm run test:e2e
```

## Configuration

### Webpack Config
VueCLI uses the vue-cli-service as a wrapper for the Webpack configuration setup.  To modify these settings 
the `package.json` must be updated.  

__Note__: Alternatively, if configuration reaches a limit where the package.json
is becoming too verbose; a `vue.config.js` file can be added with a module export object for config.

```
"vue": {
    "outputDir": "dist",
    ...
  }

```
For more Vue Configuration options, see https://cli.vuejs.org/config/#vue-config-js

### Unit testing
Jest has been configured on this project as the unit testing suite.  Configurable by
modifying the `"jest"` option in the package.json file.

__Note__: Alternatively, a `jest.config.js` file can be added in the project root.

```
"jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx"
    ],
    "testMatch": [
      "**/*.spec.(ts)"
    ],
    "testURL": "http://localhost/",
    ...
  },
```
For more Jest information, see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest

### E2E testing
The e2e is configured using the cypress.json file to kickoff the test.  Currently, this is still awaiting 
setup....

For Cypress e2e Configuration options, see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress

### SCSS
The scss is setup in the `package.json` file to import the `styles.scss` import to all outputted files.
```
"css": {
      "loaderOptions": {
        "sass": {
          "data": "@import '@/styles/styles.scss';"
        }
      }
    }
```
For more SCSS options, see https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
