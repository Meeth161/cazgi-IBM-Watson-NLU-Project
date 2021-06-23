const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    const nluInstance = getNLUInstance();

    nluInstance.analyze({ 'url': req.query.url, 'features': { 'entities': { 'emotion': true, 'limit': 2 } } })
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.json(analysisResults);
    }).catch(err => {
        console.log('error:', err);
        res.send(err);
    });
});

app.get("/url/sentiment", (req, res) => {
    const nluInstance = getNLUInstance();

    nluInstance.analyze({ 'url': req.query.url, 'features': { 'entities': { 'sentiment': true, 'limit': 2 } } })
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.json(analysisResults);
    }).catch(err => {
        console.log('error:', err);
        res.send(err);
    });
});

app.get("/text/emotion", (req, res) => {
    const nluInstance = getNLUInstance();

    nluInstance.analyze({ 'text': req.query.text, 'features': { 'keywords': { 'emotion': true, 'limit': 2 } } })
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.json(analysisResults);
    }).catch(err => {
        console.log('error:', err);
        res.send(err);
    });
});

app.get("/text/sentiment", (req, res) => {
    const nluInstance = getNLUInstance();

    nluInstance.analyze({ 'text': req.query.text, 'features': { 'keywords': { 'sentiment': true, 'limit': 2 } } })
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        res.json(analysisResults);
    }).catch(err => {
        console.log('error:', err);
        res.send(err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

