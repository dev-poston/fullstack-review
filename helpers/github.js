const axios = require('axios');
//const config = require('../config.js');
const CircularJSON = require('circular-json');


let getReposByUsername = (user, callback) => {
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  axios(options)
    .then((response) => {
      console.log('SUCCESSFULL AXIOS GET REQUEST!');
      callback(CircularJSON.stringify(response));
    });
}

module.exports.getReposByUsername = getReposByUsername;