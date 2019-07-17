# Stumbl

Stumble application built in Vue.js by Skookum Denver.

>**Check out [this project's Wiki](https://github.com/Skookum/stumbl-2019/wiki) for thorough project information!**

## Purpose

Stumbl is a simple SPA to be used by attendees of [Denver Startup Week](https://www.denverstartupweek.org/) to improve information discovery, increase attendee engagement, and increase visibility for sponsors.  Stumbl will allow users to view venue and session information.  It will also allow venues to manage the information presented to users about their business, giving them further control over their image.

- [🚀 Heroku Deployment](https://stumbl2019.herokuapp.com)
- [API Repository](https://github.com/Skookum/stmbl-api)
- [🎨 Designs](https://www.figma.com/file/SODvCflE383HZfaiLemsHIXZ/2019-DSW-Startup-Crawl?node-id=364%3A506)
- [2017 Version](https://stmbl.herokuapp.com)

# Development

## Run the application


```
1. clone this repository
2. npm install
3. npm run serve
4. open http://localhost:8080/
```

## 🛠 Troubleshooting

**Mapbox Not Displaying?**

You're probably missing the correct environment variable in your `.env` file.  Ask another dev to share the contents of their `.env` file with you.

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
