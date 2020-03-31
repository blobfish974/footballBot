const axios = require('axios');

//var url_FL1_scorers = 'https://api.football-data.org/v2/competitions/FL1/scorers';
var url_base = 'https://api.football-data.org/v2/competitions/';

const options= {
  headers: {
    "X-Auth-Token": 'c7ad6dccf19e473782b136d8da433690'
  }
};



async function get_league_scorers(league_formated) {
  try {
    const url= url_base+ league_formated + '/scorers';
    const response = await axios.get(url,options);
    //console.log(response);
    return(response.data)
  } catch (error) {
    console.error(error);
  }
}


module.exports = async league_formated => {

  const league_scorers = await get_league_scorers(league_formated);
  return league_scorers;
};
