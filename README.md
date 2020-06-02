react-serversent
================

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description
This is a sample demonstration of using Server-Sent events.
It contains the client app and the server needed.

The react app is just bare minimum. User can  post data and receive message from the server.

The server is also just as simple and only contains bare minimum functions required to demonstrate server-sent event.

## Notification API
I added Notification API in the client app. You can test it by running as localhost.

## React App Installation
Clone repository and run

```
npm install
```

## Run App
Runs the app in the development mode

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Server Installation
Please note that I did not save the required modules for the server in the package.json so you need to manually install them.

```
npm install express body-parser cors
```

## Run the server

```
npm run server
```
