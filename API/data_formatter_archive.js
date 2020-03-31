

exports.topScorers= (data) => {

	ligue=data.competition.name
	scorers=data.scorers
	num_results= scorers.length
	/**
	return_json=[]
	var i;
	for (i = 0; i < num_results; i++) {
		key='player'+i.toString();
		name=scorers[i].player.name
		num_goals=scorers[i].numberOfGoals
		team_name=scorers[i].team.name
	  	return_json[key]={name, num_goals,team_name}
	}
	return return_json*/
	var return_string="";
	return_string+= "The top scorers of "+ligue+ " are: \n";
	var i;
	for (i = 0; i < num_results; i++) {
		key='player'+i.toString();
		name=scorers[i].player.name
		num_goals=scorers[i].numberOfGoals
		team_name=scorers[i].team.name
	  	// return_json[key]={name, num_goals,team_name}
	  	return_string+="   - n°"+ (i+1) + ": "+ name + " (" +  team_name + ") - " + num_goals + " goals \n";

	}
	return return_string
}
/*
top_scorers=topScorers(top_scorer_datas)
console.log("topScorers:")
console.log(top_scorers)*/

exports.bestScorer = (data) => {
	//console.log(data)
	ligue=data.competition.name
	//console.log(ligue)
	scorers=data.scorers
	//console.log(scorers)
	return_json=[]
	key='player';
	name=scorers[0].player.name
	num_goals=scorers[0].numberOfGoals
	team_name=scorers[0].team.name
  	return_json[key]={name, num_goals,team_name}
	return return_json
}
/*
best_scorer=bestScorer(top_scorer_datas)
console.log("bestScorer:")
console.log(best_scorer)*/


exports.ligueStandings= data => {
	return_json=[]
	var i;

	num_results= data.standings[0].table.length
	//console.log(num_results)
	//console.log(data.standings[0].table )
	for (i = 0; i < num_results; i++) {
		key='team'+i.toString();
		position=data.standings[0].table[i].position //0 for total ranking (exist home and exterior ranking too)
		name=data.standings[0].table[i].team.name
		points=data.standings[0].table[i].points
	  	return_json[key]={position,name,points}
	}
	//console.log(return_json)
	return return_json
}
/*
ranking=ligueStandings(standing_datas)
console.log("ligueStandings:")
console.log(ranking)*/

exports.bestTeam = data => {
	return_json=[]
	var i;
	//console.log(data.standings[0].table )
	key='team'
	position=data.standings[0].table[0].position //0 for total ranking (exist home and exterior ranking too)
	name=data.standings[0].table[0].team.name
	points=data.standings[0].table[0].points
  	return_json[key]={position,name,points}
	return return_json
}

/*best_team=bestTeam(standing_datas)
console.log("bestTeam:")
console.log(best_team)

const api_request=await  require('./api_request.js')
console.log(api_request)
ranking_test=ligueStandings(api_request)
console.log("ligueStandings:")
console.log(ranking_test)*/
