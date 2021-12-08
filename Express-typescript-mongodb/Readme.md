## Express Ts with mongodb (mongoose)

- **.env**: store your configuration values, for example db connection
- **.eslintrc**: eslint configuration file (tslint is deprecated, do not use it)
- **.prettierrc**: common code formatting configuration goes here
- **.nodemon.json**: nodemon config goes here
- **.tsconfig.json**: typescript config goes here

## Connecting to Mongodb

In the ``.env`` you can set up your db connection. If you want to use docker image for mongodb, you can start it in the ``mongodb`` folder.

For development purpose you can register at mongodb atlas, this will give you a free mongodb cluster. 

## Generating tsconfig

``tsc --init``

## Staring your application


``npm run dev``: Start your application locally with nodemon hot reload

``npm run build``: Build your application, compile it from typescript to javascript

``build_clean:win``: Before build your application in windows clean the dist folder.

``build_clean:unix``: Before build your application in unix clean the dist folder.

``start``: Start your application development mode, without hot reload.

``start``: Start your application in production mode.

## Starting your application in docker

``docker-compose up -d --build``: Starting in development mode

``docker-compose -f docker-compose.prod.yml up -d --build``: Starting in production mode