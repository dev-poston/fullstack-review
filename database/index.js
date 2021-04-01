const mongoose = require('mongoose');
const config = require('../config.js');


//mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect(config.MONGODB_URI);
let db = mongoose.connection;

db.once('open', () => {
  console.log('CONNECTED TO MongoDB!');
});
db.on('error', (error) => {
  console.log('FAILED TO CONNECT TO MONGODB:', error);
});

let repoSchema = mongoose.Schema({
  _id: Number,
  owner: String,
  fullName: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  let record = new Repo({
    _id: repo.id,
    owner: repo.owner,
    fullName: repo.fullName,
    url: repo.url,
    watchers: repo.watchers
  });
  record.save((err, data) => {
    if (err) {
      console.log('FAILED TO SAVE: ', err);
    } else {
      console.log('MONOGODB - SAVING TO DB!');
    }
  });
};

let find = (user, callback) => {
  console.log('FIND USER: ', user);
  Repo.find(user).limit(25).sort({watchers: -1})
    .then((data) => {
      console.log('MONOGODB - SEARCHING DB');
      callback(data);
    });
};

let update = (user, doc, callback) => {
  console.log('MONGODB - USER TO UPDATE: ', user);
  Repo.update(user, doc)
    .then((data) => {
      console.log('MONGODB - UPDATING DB', data);
      callback(data);
    })
};

module.exports = {save, find, update};