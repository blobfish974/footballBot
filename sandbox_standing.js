const api_scraper_standing = require('./api_scraper_standing.js');
const data_formatter = require('./API/data_formatter.js');
const league_formater=require('./API/league_formatter');


async function league_standing(league_name) {
	var league_formated=league_formater(league_name);
    console.log("league_formated: ", league_formated);
	try {
		console.log("🏆  fetching " + league_formated + " standing...");
		const standing_data = await api_scraper_standing(league_formated);
		ranking=data_formatter.ligueStandings(standing_data)
		console.log("ligueStandings:")
		console.log(ranking)
		return ranking
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function best_team(league_name) {
	var league_formated=league_formater(league_name);
    console.log("league_formated: ", league_formated);
	try {
		console.log("🥇  fetching " + league_formated + " best team...");
		const standing_data = await api_scraper_standing(league_formated);
		best_team=data_formatter.bestTeam(standing_data)
		console.log("bestTeam:")
		console.log(best_team)
		return best_team
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}



module.exports.league_standing = league_standing;
module.exports.best_team = best_team;


