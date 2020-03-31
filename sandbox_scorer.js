const api_scraper_scorers= require('./api_scraper_scorers.js');
const data_formatter = require('./API/data_formatter.js');
const league_formater=require('./API/league_formatter');

async function top_scorers(league_name) {
	var league_formated=league_formater(league_name);
    console.log("league_formated: ", league_formated);
	try {
		console.log("⚽️ fetching "+ league_formated +" top scorers...");
		const scorers_data = await api_scraper_scorers(league_formated);
		top_scorers=data_formatter.topScorers(scorers_data)
		console.log("topScorers:")
		console.log(top_scorers)
		return top_scorers
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function top_scorer(league_name) {
	var league_formated=league_formater(league_name);
    console.log("league_formated: ", league_formated);
	try {
		console.log("⚽️ fetching "+ league_formated + " best scorer...");
		const scorers_data = await api_scraper_scorers(league_formated);
		best_scorer=data_formatter.bestScorer(scorers_data)
		console.log("bestScorer:")
		console.log(best_scorer)
		return best_scorer
	} catch (e) {
    console.error(e);
    process.exit(1);
  }
}


module.exports.top_scorers = top_scorers;
module.exports.top_scorer = top_scorer;

