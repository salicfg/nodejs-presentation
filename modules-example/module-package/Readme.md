# Initialize package.json

`npm init -y`

-y because we want to skip all questions.

# ES6 module imports without mjs

If we would like to use the new `ES6 module import/export` for the whole project, we can define the module type at the `package.json`.

` "type": "module"`

# Nodemon

We do not want to restart our server manually all the time. To make these restarts automatically we have to `install nodemon`. Nodemone monitoring all the file changes then restart our developement server automatically.

`npm i -D nodemon`

`-D` or `--save-dev` save this dependency to the dev-dependency.

If we want to install any other dependency type `npm i dependency-name --save` or if you have `npm 5 or later` simply type `npm i dependency-name`.

# Npm Scripts

If we do not want to write long cmd commands, for example `node --experimental-json-modules index.mjs` we can create our own script at `package.json` file.

```
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
```

We can run our scripts by typing `npm start` or `npm run dev` commands. In this case `npm start` run our server without monitorin, but if we start our server with `npm run dev` we can use our new `nodemon` dependency, and the server `restart & update` automatically we it detects any changes.
