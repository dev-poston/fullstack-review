const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
const Promise = require('bluebird');
const cors = require('cors');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const serverURL = 'https://afternoon-atoll-48900.herokuapp.com/';

app.post(serverURL, function (req, res) {
  db.find(req.body, (cursor) => {
    if (cursor.length) {
      console.log('USER FOUND - UPDATING RECORDS!');
      let updateArr = [];
      getRepos.getReposByUsername(req.body.owner, (response) => {
        let parseResponse = JSON.parse(response);
        for (let i = 0; i < parseResponse.data.length; i++) {
          let updateObj = {
            _id: parseResponse.data[i].id,
            owner: parseResponse.data[i].owner.login,
            fullName: parseResponse.data[i].full_name,
            url: parseResponse.data[i].html_url,
            watchers: parseResponse.data[i].watchers_count
          };
          updateArr.push(updateObj);
          db.update({_id: parseResponse.data[i].id}, {$set: updateObj});
        }
        //res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(updateArr);
      });
    } else {
      getRepos.getReposByUsername(req.body.owner, (response) => {
        console.log('USER NOT FOUND - ADDING TO DB!');
        let saveArr = [];
        let parseResponse = JSON.parse(response);
        for (let i = 0; i < parseResponse.data.length; i++) {
          let saveObj = {
            id: parseResponse.data[i].id,
            owner: parseResponse.data[i].owner.login,
            fullName: parseResponse.data[i].full_name,
            url: parseResponse.data[i].html_url,
            watchers: parseResponse.data[i].watchers_count
          };
          saveArr.push(saveObj);
          db.save(saveObj);
        }
        //res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(saveArr);
      });
    }
  });
});

app.get(serverURL, function (req, res) {
  db.find({}, (cursor) => {
    //res.header('Access-Control-Allow-Origin', '*');
    res.status(200).send(cursor);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

