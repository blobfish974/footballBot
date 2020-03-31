const axios = require('axios');

//var url_FL1_standing = 'https://api.football-data.org/v2/competitions/FL1/standings';
var url_base = 'https://api.football-data.org/v2/teams/';

const options= {
  headers: {
    "X-Auth-Token": 'c7ad6dccf19e473782b136d8da433690'
  }
};


async function get_team(team_formated) {
  try {
    const url= url_base+ team_formated;
    const response = await axios.get(url,options);
    return(response.data)
  } catch (error) {
    console.error(error);
  }
}


module.exports = async team_formated => {

  const team_informations = await get_team(team_formated);

  return team_informations;
};
