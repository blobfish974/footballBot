const app = require('./app.js');
const data_formatter = require('./API/data_formatter.js');


async function league_standing() {
	try {
		console.log(`🏆  fetching FL1 standing...`);
		const data = await app();
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
		ranking=data_formatter.ligueStandings(standing_data)
		console.log("ligueStandings:")
		console.log(ranking)
		return ranking
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function best_team() {
	try {
		console.log(`🥇  fetching FL1 best team...`);
		const data = await app();
		//console.log(data)
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
		//{standing, scorers}
		//console.log(`🍿 ${standing.length} standing found.`);
		//console.log(standing_data);
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


