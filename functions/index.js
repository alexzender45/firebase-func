const express = require('express');
const cors = require('cors');
const uuidv5 = require('uuid/v5');

// Firebase init
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Express and CORS middleware init
const app = express();
app.use(cors());

// POST / method
app.post("/", (request, response) => {
     
    const entry = request.body;

    return admin.database().ref('/user{userId}').push(entry)
        .then(() => {
            return response.status(200).send(entry, uuidv5('hello.example.com', uuidv5.DNS))
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        });
});

exports.entries = functions.https.onRequest(app);