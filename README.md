# Webpack-boilerplate

### Supports
  - ES6 Support via babel (v7)🚀
  - SASS Support via sass-loader
  - Pug
  - Webpack 4.x
  - Linting via eslint-loader

### Installation
Clone the repo
```sh
git clone git@github.com:usulla/webpack-boilerplate.git
```
Install dependencies with npm or yarn:
```sh
cd webpack-boilerplate
npm install or yarn install
```
and start the server
```sh
npm start or yarn start
```
### Build the app
Possible commands to launch the app and build:
npm run 
  - start
  - build
  - dev
  - stats

Running the app on a local server in development mode (in live reload mode):
```sh
npm run start
```
For viewing in the browser:
```sh
http://localhost:4100
``` 

For development environments:
```sh
npm run dev
```

For production environments:
```sh
npm run build
```

#### Both version (dev, prod) includes:
  - any quantity html/pug of files,
  - sass to css,
  - pug to html,
  - js from es6,
  - added css from src/css/ folder to index.html in head,
  - added js from src/js/ folder to index.html before /body,
  - concatenation css, js to main.css, main.js,
  - autoprefixer,
  - optimization images,
  - adding hashes to css, js, fonts,
  - copy files from folders src/js/libs/, src/json


#### Dev version includes:
  - source map

#### Production version includes:
  - minimization css, js files,
  - adding hashes to css, js, fonts
