const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;
db.once('open', () => {
  console.log('CONNECTED TO MongoDB!');
});
db.on('error', (error) => {
  console.log('FAILED TO CONNECT TO MONGODB:', error);
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  owner: String,
  fullName: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB

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
      console.log('MONOGODB SUCCESSFULLY SAVED TO DATABASE!');
    }
  });
};

let find = (callback) => {
  Repo.find({}).limit(25).sort({watchers: -1})
    .then((data) => {
      console.log('MONOGODB SUCCESSFULLY SEARCHED THE DATABASE');
      callback(data);
    });
};

module.exports = {save, find};