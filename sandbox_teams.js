const api_scraper_team = require('./api_scraper_team.js');
const data_formatter = require('./API/data_formatter.js');
const team_formater=require('./API/team_formatter');

async function team_composition(team_name, position) { //position is already a verified string (in upper case)
	var team_formatted=team_formater(team_name); //team is a integer
    console.log("team_formatted: ", team_formatted);
	try {
		console.log("🏆  fetching " + team_formatted + " team...");
		const team_data = await api_scraper_team(team_formatted);
		team_data_formatted=data_formatter.teamComposition(team_data,position)
		console.log("team_data_formatted:")
		console.log(team_data_formatted)
		return team_data_formatted
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function team_information(team_name) { 
	var team_formatted=team_formater(team_name); //team is a integer
    console.log("team_formatted: ", team_formatted);
	try {
		console.log("📄  fetching " + team_formatted + " team...");
		const team_data = await api_scraper_team(team_formatted);
		team_data_formatted=data_formatter.teamInformations(team_data)
		console.log("team_data_formatted:")
		console.log(team_data_formatted)
		return team_data_formatted
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}



module.exports.team_composition = team_composition;
module.exports.team_information = team_information;


