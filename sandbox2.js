const app = require('./app.js');
const data_formatter = require('./API/data_formatter.js');

/*
module.exports =async function start() {
  try {
    console.log(`📽️  fetching FL1 stadning...`);
    const standing = await app(FL1_standing);
    console.log(`🍿 ${standing.length} standing found.`);
    console.log(standing);

    return standing;
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
  
}

start()*/
async function league_standing() {
	try {
		console.log(`📽️  fetching FL1 standing...`);
		const data = await app();
		//console.log(data)
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
		//{standing, scorers}
		//console.log(`🍿 ${standing.length} standing found.`);
		//console.log(standing_data);
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
		console.log(`📽️  fetching FL1 best team...`);
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


async function top_scorers() {
	try {
		console.log(`📽️  fetching FL1 top scorers...`);
		const data = await app();
		//console.log(data)
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
		//{standing, scorers}
		//console.log(`🍿 ${standing.length} standing found.`);
		//console.log(standing_data);

		//console.log(scorers_data)
		top_scorers=data_formatter.topScorers(scorers_data)
		console.log("topScorers:")
		console.log(top_scorers)
		return top_scorers
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function top_scorer() {
	try {
		console.log(`📽️  fetching FL1 top scorer...`);
		const data = await app();
		//console.log(data)
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
		//{standing, scorers}
		//console.log(`🍿 ${standing.length} standing found.`);
		//console.log(standing_data);

		best_scorer=data_formatter.bestScorer(scorers_data)
		console.log("bestScorer:")
		console.log(best_scorer)
		return best_scorer
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}

/*
function getData() {
	return axios.get('https://jsonplaceholder.typicode.com/posts');
  }
  
  (async () => {
	 console.log(await getData())
  })()
  */

module.exports.league_standing = league_standing;
module.exports.best_team = best_team;
module.exports.top_scorers = top_scorers;
module.exports.top_scorer = top_scorer;

//test()