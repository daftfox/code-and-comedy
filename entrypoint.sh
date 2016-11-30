#!/bin/bash
sed -i "s#http://localhost:3000/api/#$API_URL#g" front-end/app/scripts/config.js
grunt build
npm start