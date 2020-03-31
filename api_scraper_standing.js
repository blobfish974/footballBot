const axios = require('axios');

//var url_FL1_standing = 'https://api.football-data.org/v2/competitions/FL1/standings';
var url_base = 'https://api.football-data.org/v2/competitions/';

const options= {
  headers: {
    "X-Auth-Token": 'c7ad6dccf19e473782b136d8da433690'
  }
};


async function get_league_standing(league_formated) {
  try {
    const url= url_base+ league_formated + '/standings';
    const response = await axios.get(url,options);
    return(response.data)
  } catch (error) {
    console.error(error);
  }
}


module.exports = async league_formated => {

  const league_standing = await get_league_standing(league_formated);

  return league_standing;
};
