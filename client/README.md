# MerchantAffiliate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Development server

Run `ng serve` Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- For a production server add `-prod`

- For a test server add `--env=test`

- For a dev server don't add any flags

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Builds

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

- For a simple dev build to serve locally, do `ng build`

### DEV Environment Build

```bash
ng build -c devopt
```

### TEST Environment Build

```bash
ng build -c test
```

### PRODUCTION Environment Build

```bash
ng build -c production
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running the app locally:

1) clone the repo

2) run `npm install`

3) run `npm start`

## Deploy on dev

- simply run: ./deploy-frontend.sh

this will:

- build the app in ./dist

- tar it,

- copy it to the server

- create a backup of the existing deployed app

- extract the tar into the correct folder


## Adding a new language:

1) open src/assets/i18n folder

2) create a new file and name it language code.ts e.g. en.ts

3) copy the content from en.ts to the new language file then translate all the texts

4) move through the other languages files search for "LANGUAGE" key

5) Add there a property with the name of the new language code where the value is the name of the new language.

6) open src/app/core/constants/i18n.constants.ts file

7) add the new language code and name to the available languages

8) fill other preferences as needed. example fill languageToMonthsNames to change months names in date picker upon language change (default is English).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
