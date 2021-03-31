const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const db = require('../database/index.js');
const async = require('async');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  console.log('POST REQUEST RECEIVED @ SERVER!');

  db.find(req.body, (cursor) => {
    if (cursor.length) {
      getRepos.getReposByUsername(req.body.owner, (response) => {
          let parseResponse = JSON.parse(response);
          for (let i = 0; i < parseResponse.data.length; i++) {
            db.update({_id: parseResponse.data[i].id}, {$set: {
              owner: parseResponse.data[i].owner.login,
              fullName: parseResponse.data[i].full_name,
              url: parseResponse.data[i].html_url,
              watchers: parseResponse.data[i].watchers_count
            }});
          }
        });
      res.status(200).send('Success');
    } else {
      getRepos.getReposByUsername(req.body.owner, (response) => {
        let parseResponse = JSON.parse(response);
        for (let i = 0; i < parseResponse.data.length; i++) {
          db.save({
            id: parseResponse.data[i].id,
            owner: parseResponse.data[i].owner.login,
            fullName: parseResponse.data[i].full_name,
            url: parseResponse.data[i].html_url,
            watchers: parseResponse.data[i].watchers_count
          });
        }
        res.status(200).send('Success');
      });
    }
  });
});

app.get('/repos', function (req, res) {
  db.find({}, (cursor) => {
    res.status(200).send(cursor);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

