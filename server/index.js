const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
const cors = require('cors');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const serverURL = '/repos';

app.post(serverURL, function (req, res) {
  db.find(req.body, (cursor) => {
    if (cursor.length) {
      console.log('USER FOUND - UPDATING RECORDS');
      getRepos.getReposByUsername(req.body.owner, (response) => {
        let updateCounter = 0;
        let parseResponse = JSON.parse(response);
        for (let i = 0; i < parseResponse.data.length; i++) {
          let updateObj = {
            _id: parseResponse.data[i].id,
            owner: parseResponse.data[i].owner.login,
            fullName: parseResponse.data[i].full_name,
            url: parseResponse.data[i].html_url,
            watchers: parseResponse.data[i].watchers_count
          };
          db.update({_id: parseResponse.data[i].id}, {$set: updateObj}, (data) => {
            console.log('RECORDS UPDATED');
            updateCounter += 1;
            if (updateCounter === parseResponse.data.length) {
              db.find({}, (cursor) => {
                res.status(200).send(cursor);
              });
            }
          });
        }
      });
    } else {
      getRepos.getReposByUsername(req.body.owner, (response) => {
        console.log('USER NOT FOUND - ADDING TO DB');
        let saveCounter = 0;
        let parseResponse = JSON.parse(response);
        for (let i = 0; i < parseResponse.data.length; i++) {
          let saveObj = {
            id: parseResponse.data[i].id,
            owner: parseResponse.data[i].owner.login,
            fullName: parseResponse.data[i].full_name,
            url: parseResponse.data[i].html_url,
            watchers: parseResponse.data[i].watchers_count
          };
          db.save(saveObj, (data) => {
            console.log('SAVE COMPLETE');
            saveCounter += 1;
            if (saveCounter === parseResponse.data.length) {
              db.find({}, (cursor) => {
                res.status(200).send(cursor);
              });
            }
          });
        }
      });
    }
  });
});

app.get(serverURL, function (req, res) {
  db.find({}, (cursor) => {
    res.status(200).send(cursor);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});