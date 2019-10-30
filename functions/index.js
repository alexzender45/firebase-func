'use strict';

const express = require('express');
const cors = require('cors');

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

    return admin.database().ref('/messages').push(entry)
        .then(() => {
            return response.status(200).send(entry)
        }).catch(error => {
            console.error(error);
            return response.status(500).send('Oh no! Error: ' + error);
        });
});

// GET / method
app.get("/", (request, response) => {
    return admin.database().ref('/messages').on("value", snapshot => {
        return response.status(200).send(snapshot.val());
    }, error => {
        console.error(error);
        return response.status(500).send('Oh no! Error: ' + error);
    });
});

exports.entries = functions.https.onRequest(app);

exports.GenerateUuid = functions.database.instance('todolist-app-275ac').ref('/messages/{UserId}')
    .onCreate((snapshot, context) => {
        console.log(snapshot.val());
        console.log(context);
        const uuidv5 = require('uuid/v5');
        const SAM = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        const code = uuidv5('enye-id', SAM);
        return snapshot.ref.update({ userId : code});
    });