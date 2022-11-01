# Currency Exchanger Project

Currency Exchange Project designed and developed by Shashank Balodi.
## Usage

### Using the project on live environment

Simply go to this URL: https://github.com/balodi-shashank/currency-exchanger

Run these commands in the terminal to run the app on your local environment

    git clone https://github.com/balodi-shashank/currency-exchanger.git

    npm install

    npm start

### Development server

Run `npm start` or `yarn start` for a dev server to initialize. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## App's Architecture
*   Used latest Angular CLI v14.2.7

*   Used code scaffolding for effective working and clean development environment. Specialized `build`, `deploy`, `lint` scripts added to package.json.

*   `lint-staged` script cleans and checks the `TypeScript`, `SCSS` codes before committing any changes to the repository. `prettier`, `stylelint` and `tslint` plugins run in this script.

*   Used `SCSS` as a CSS preprocessor to write efficient CSS codes.

*   Used new generation `JavaScript (ES6, ES7)` with `TypeScript`.

*   Used `Angular Services` for sharing app state and data-binding within injected components.

*   Used latest `ngx Bootstrap v9.0.0` version to integrate powerful responsive design powered by CSS FlexBox model.

*   Used `semantic` HTML tags and elements with semantic class names.

*   Modular components created for reusing components elsewhere to improve modularity in the app.

*   Used `Interceptors` to simulate backend-less login functionality while using HTTP request.

*   App designed from scratch with the inspiration of the bootstrap principles with Mobile first approach.

*   Modular components created for reusing components elsewhere to improve modularity in the app.

## Motivation of Choices on Implementation

*   The form immediately responses to user interactions with its `validation` checkers through snackbar notification.

*   `tabindex` values added for form elements in a numeric order to complete the form just with the use of keyboard for accessibility.

*   `Enter` key press in the selection of currencies helps users to select the currency that they want to exchange easily.

*   In case of navigating to a page which doesn't exist in the app, a `wildcard route (404)` is integrated to the project. It redirects users to the `Not Found` page. 

*   Form data is sent asynchronously by `HTTP GET request` with `RxJS` observables. I also created an interface for a hypothetical response from the server for this request. A refactor must be done when a backend is ready to make it work in a live environment.

*   Used `localStorage` to store user's currency exchanges with a key:value pair namely `exchangeRates` and an array of exchanged currency information objects. Also, localStorage used to store generic values.

*   Whenever a user enters to the `Converter` page, an asynchronous `HTTP GET request` runs for `https://api.apilayer.com/fixer/latest?base=USD` API.

*   User can convert between selected currencies with the defined amount.

*   Each conversion immediately goes to the `Exchange History` datatable with the exact time of the execution.

*   On `History chart section` page user can see the previous currency exchanges on chart with the amount of the exchange rate using `chart.js`.

*   Mobile device UI behaviours designed to improve User Experience in a performing way and coded with the usage of the @media queries.

*   `Angular production build configuration` is used for optimizing bundle, using tree-shaking, aot compilation, compression.

*   locallization is also taken care using `ngx-translate`. Language service is also available if we need to switch language while working on app but it    was not in scope so implementation keys are not provided.

*   User can quick switch `From` to  `To` currency by clicking bidirectional icon and check current conversion rate in the left side for the current selection.

*   Two quick link for history details view of `EUR-USD` and `EUR-GBP` are available on top right corner.

*   Page title will be displayed based on the detail view or normal view. and user can land back on home page if user click on `back to home button ` beside page title. 

*   `9 Tiles` below convertor panel shows default top currencies conversion to the user.

*  Sample `unit test` cases added for refernce to added surity to the logic in the application.

*   The total bundle size of the app is `~500KB` including all CSS, JS, FONT, ICONS and HTML files.

### Running scripts 

To build the app in `Ahead-Of-Time compilation` you need to run `yarn build:prod` or `npm run build:prod`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
