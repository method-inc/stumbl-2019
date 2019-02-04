# Stumbl (Front End)

Stumble Front End application built in Vue.js by Skookum Denver.

## Purpose

Stumbl is a simple SPA to be used by attendees of [Denver Startup Week](https://www.denverstartupweek.org/) to improve information discovery, increase attendee engagement, and increase visibility for sponsors.  Stumbl will allow users to view venue and session information.  It will also allow venues to manage the information presented to users about their business, giving them further control over their image.

[2017 Version](https://stmbl.herokuapp.com)

## Team Objectives

* 📝 **Document code heavily** to educate the next developer
* 🤔 Try to work on **unfamiliar technology** to learn new tech
* 🕵️‍ Help teammates **discover solutions** - don't just solve for them if you know it
* 🛠 **Resist tools** like scaffolding CLIs and prebuilt solutions.  Handroll components when possible to learn the technology under the hood.
* 👯‍ Work together with **every member** of the team at some point
* 🎉 **Celebrate each other's successes, and have fun!**

## Intention

To build strong relationships with each other by working together to learn new technologies and methods of software project development, expand our technical knowledge, and ultimately deliver a product to real users with the intention of maximizing their engagement with Denver Startup Week.

## Issue Tracking

We use Github Project Boards to track our tasks.  We will develop and groom these work items as a team each meeting.

-----

## Important Dates

* ⌨️ **June-ish**: Vue 3.x released
  * *Class based components, built-in ts support*
* ✅ **July 15th**: QA Ready
  * *Reach out to a couple DSW Venues to get them to use Stumbl*
* 🚀 **August 16th**: Development completed, critical bug squashing only
* 🎉 **September 16th**: Denver Startup Week Begins

**Sales Meetings with DSW Stakeholders**, and milestones to reach by each

* **January 18th**
  * Project boilerplate set up
  * Feature set decided
  * Wireframes under-way

----- 

# Development

## Run the application

```
// clone this repository
npm install
npm run dev
open http://localhost:8080/
```

## Run the Unit Tests

```
npm run test:unit
```

## Run the e2e Tests

```
npm run test:e2e
```

## Branching Strategy: Git Flow

We'll utilize [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/), which keeps branches organized with the following 5 branches/prefixes:

* master
* develop
* release/
* feature/
* hotfix/

In short, most work will be on a `feature/` branch, which comes off of `develop`.  For example, `feature/11-custom-map-points`, where `11` indicates the issue number, followed by a short description.

# Major Tasks

* Components List
* Designs
* Set up Github Project Tracker
* Set up deployment environments for front and back end
* Find out who to talk to about deploying to stumbl.skookum.com

## "Wants"

* Utilize Lottie CSS animations



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
