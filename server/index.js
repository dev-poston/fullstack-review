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

app.post('/repos', function (req, res) {
  console.log('POST REQUEST RECEIVED @ SERVER!');
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  getRepos.getReposByUsername(req.body.owner, (response) => {
    //console.log('SUCCESSFUL AXIOS GET REQUEST @ SERVER: ', response.data);
    for (let i = 0; i < response.data.length; i++) {
      db.save({
        owner: response.data[i].owner.login,
        repoName: response.data[i].name,
        url: response.data[i].html_url,
        watchers: response.data[i].watchers_count
      });
    }
  });

  db.find().toArray((err, cursor) => {
    if (err) {
      console.log('FAILED TO QUERY MONGODB DOCS: ', err);
    } else {
      console.log('ALL MONGODB DOCUMENTS: ', cursor);
    }
  });

  res.status(200);
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

