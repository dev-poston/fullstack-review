const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (user, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    method: 'get',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
    .then((response) => {
      console.log('SUCCESSFULL AXIOS GET REQUEST!');
      callback(response);
    })
    .catch((error) => {
      console.log('FAILED AXIOS GET REQUEST: ', error);
    });
};

module.exports.getReposByUsername = getReposByUsername;