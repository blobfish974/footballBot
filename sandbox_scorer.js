const app = require('./app.js');
const data_formatter = require('./API/data_formatter.js');


async function top_scorers() {
	try {
		console.log(`⚽️ fetching FL1 top scorers...`);
		const data = await app();
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers

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
		console.log(`⚽️ fetching FL1 top scorer...`);
		const data = await app();
		standing_data=data.FL1_standing
		scorers_data=data.FL1_scorers
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

