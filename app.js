const axios = require('axios');

var url_FL1_standing = 'https://api.football-data.org/v2/competitions/FL1/standings';

const options_FL1_standing= {
  headers: {
    "X-Auth-Token": 'c7ad6dccf19e473782b136d8da433690'
  }
};


// FOR TOP SCORERS

var url_FL1_scorers = 'https://api.football-data.org/v2/competitions/FL1/scorers';

const options_FL1_scorers= {
  headers: {
    "X-Auth-Token": 'c7ad6dccf19e473782b136d8da433690'
  }
};


// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getFL1_standing() {
  try {
    const response = await axios.get(url_FL1_standing,options_FL1_standing);
    return(response.data)
  } catch (error) {
    console.error(error);
  }
}


async function getFL1_scorers() {
  try {
    const response = await axios.get(url_FL1_scorers,options_FL1_scorers);
    //console.log(response);
    return(response.data)
  } catch (error) {
    console.error(error);
  }
}


module.exports = async variable => {

  const FL1_standing = await getFL1_standing();
  const FL1_scorers = await getFL1_scorers();
  //console.error(FL1_standing);
  return {FL1_standing,FL1_scorers};
};
