const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
let db = mongoose.connection;

db.once('open', () => {
  console.log('CONNECTED TO MONGODB!');
});
db.on('error', (error) => {
  console.log('FAILED TO CONNECT TO MONGODB:', error);
});


let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // _id: Number, do we need if monogoDB auto adds this if omitted
  owner: String,
  repoName: String,
  url: String,
  watchers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let record = new Repo({
    owner: repo.owner,
    repoName: repo.repoName,
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

let find = (users) => {
  //Do we need to write this or can we use the native mongodb .find() method???
};

module.exports = {save, find};