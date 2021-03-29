const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', () => {
  console.log('Connect to MongoDB');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  // _id: Number, do we need if monogoDB auto adds this if omitted
  owner: String,
  url: String,
  followers: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  let record = new Repo({
    owner: repo.owner,
    url: repo.url,
    followers: repo.followers
  });
  record.save((err, data) => {
    if (err) {
      console.log('FAILED TO SAVE: ', err);
    } else {
      console.log('MONOGODB SUCCESSFULLY SAVED TO DATABASE', data);
    }
  });
};

let find = (users) => {
  //Do we need to write this or can we use the native mongodb .find() method???
};

module.exports = {save, find};