#PROJECT DETAILS
##GitHub Repo: 
> https://github.com/adavuruku/comtravo

##INSTRUCTIONS

###2. SETTING UP .env file

1. Create .env file in the root folder and copy the contents bellow to it.

> Setup for environment variables (.env)

   >APP_NAME=Comtravo Flight App
   NODE_ENV=dev
   PORT=8080
   APP_API_TOKEN=Y3RfaW50ZXJ2aWV3ZWU6c3VwZXJzZWNyZXQ=
   APP_DOMAIN=comtravo.com
   SERVICE_URL=http://127.0.0.1:3000/api/v1
   DB_URL=<REPLACE WITH A LIVE MONGODB>
   DB_TEST_URL=mongodb://localhost:27017/comtravvoDB?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

###3. Starting the project
>1. yarn add . or yarn install
>2.  yarn run watch  OR
>3. yarn run start

###4. Testing the project
>1. yarn run test:cov -> test coverage.
>2. yarn run test:e2e -> e2e test

###5. OpenAPI Swagger Documentation
1. http://localhost:8080/v1/api-doc

###5. Docker Implementaion
> Docker deployment file is also available.

##Author
> Abdulraheem Sherif Adavuruku
> 08164377187
> aabdulraheemsherif@gmail.com