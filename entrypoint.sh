#!/bin/bash
sed -i "s#http://go.ordina.nl/l/83122/2016-11-23/6k58pq#$API_URL#g" front-end/app/scripts/config.js
npm install
npm start
