# Step by step

1.  npm init
2.  npm i typescript -D, npx tsc --init (new) / npm typescript --init (old)
3.  mkdir src, touch src/app.ts
4.  npm i ts-node-dev, in scripts = dev: "ts-node-dev --respawn --transpile-only src/app.ts"
5.  npm i express config, npm i @types/express @types/config -D
6.  logger npm i pino pino-pretty moment
7.  validate npm i zod
8.  model - user npm i brcypt, npm i --save-dev @types/bcrypt, npm i lodash ,npm i --save-dev @types/lodash
9.  service -> schema -> controller -> routes
10. schema npm i zod
11. create session modules and generate access/refresh tokens
12. utils folder create jwt, npm i jsonwebtoken, npm i --save-dev @types/jsonwebtoken
13. # Generate new keys: https://travistidwell.com/jsencrypt/demo/
    click the async checkbox and change to 2048 # Base64 encode the keys: https://www.base64encode.org/
    or use node publicprivateGenerate.js change secretmessage
    include in config folder and .env file
14. # create session with access token and refresh token

    models -> schema -> service -> controller -> deserializeuser
    -> requireuser -> getsession -> deletesession

15. npm i --save-dev @types/swagger-jsdoc @types/swagger-ui-express
    npm i swagger-jsdoc swagger-ui-express
    create swagger.ts

    1. pattern in routes, then schema if necessary.

16. npm i supertest jest ts-jest @types/jest @types/supertest -D
    create a jest.config.js file and copy paste codes written there.
    create a name.test.ts file inside the **tests** folder
    create a describe block that has a description of the test that will occur followed by an it block which will show the expected output.
    in package.json -> scripts -> "test": "jest"
    npm test filename --watch (specific file to be tested)

17. npm i nanoid, npm i @types/nanoid -D
