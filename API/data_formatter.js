
//functions in this module take inputs as json and return human readable strings



exports.topScorers= (data) => {

	ligue=data.competition.name
	scorers=data.scorers
	num_results= scorers.length
	var return_string="";
	return_string+= "⚽️ The top scorers of "+ligue+ " are: \n";
	var i;
	for (i = 0; i < num_results; i++) {
		name=scorers[i].player.name
		num_goals=scorers[i].numberOfGoals
		team_name=scorers[i].team.name
	  	return_string+="   - n°"+ (i+1) + ": "+ name + " (" +  team_name + ") - " + num_goals + " goals \n";

	}
	return return_string
}

exports.bestScorer = (data) => {

	ligue=data.competition.name
	scorers=data.scorers
	var return_string= "⚽️🥇  The best scorer of "+ ligue + " is: \n";

	name=scorers[0].player.name
	num_goals=scorers[0].numberOfGoals
	team_name=scorers[0].team.name

	return_string+= name + " (" +  team_name + ") with " + num_goals + " goals \n";
	return return_string
}


exports.ligueStandings= data => {

	ligue=data.competition.name
	var return_string= "🏆 The "+ ligue + " standing is: \n";
	
	var i;
	num_results= data.standings[0].table.length
	for (i = 0; i < num_results; i++) {
		key='team'+i.toString();
		position=data.standings[0].table[i].position //0 for total ranking (exist home and exterior ranking too)
		name=data.standings[0].table[i].team.name
		points=data.standings[0].table[i].points
	  	return_string+="   - n°"+ (i+1) + ": " + name + " with " + points + " points \n";
	}
	return return_string
}


exports.bestTeam = data => {
	ligue=data.competition.name
	var return_string= "🥇 The best team of "+ ligue + " is: \n";

	position=data.standings[0].table[0].position //0 for total ranking (exist home and exterior ranking too)
	name=data.standings[0].table[0].team.name
	points=data.standings[0].table[0].points

  	return_string+= name + " with " + points + " points";
	return return_string
}

exports.teamComposition = (data,position) => { //position should be a valid string (in upper case)
	name=data.name

	

	var i;
	num_results= data.squad.length

	if (position === 'GOALKEEPER'){
		var return_string= "🥅 The "+ name + " goalkeepers are : \n";

		for (i = 0; i < num_results; i++) {
			if(data.squad[i].position=="Goalkeeper"){
				player_name=data.squad[i].name 
	  			return_string+=" - " + player_name + "  \n";
	  	 	}
		}
		return return_string
	}

	else if (position === 'DEFENDER'){
		var return_string= "🛡 The "+ name + " defenders are : \n";

		for (i = 0; i < num_results; i++) {
			if(data.squad[i].position=="Defender"){
				player_name=data.squad[i].name 
	  			return_string+=" - " + player_name + "  \n";
	  	 	}
		}
		return return_string
	}

	else if (position === 'MIDFIELDER'){
		var return_string= "⛹️ The "+ name + " midfielders are : \n";

		for (i = 0; i < num_results; i++) {
			if(data.squad[i].position=="Midfielder"){
				player_name=data.squad[i].name 
	  			return_string+=" - " + player_name + "  \n";
	  	 	}
		}
		return return_string
	}

	else if (position === 'ATTACKER'){
		var return_string= "🎯 The "+ name + " attackers are : \n";

		for (i = 0; i < num_results; i++) {
			if(data.squad[i].position=="Attacker"){
				player_name=data.squad[i].name 
	  			return_string+=" - " + player_name + "  \n";
	  	 	}
		}
		return return_string
	}

	else if (position === 'COACH'){
		var return_string= "👨‍💼 The "+ name + " coaches are : \n";

		for (i = 0; i < num_results; i++) {
			if(data.squad[i].role != "PLAYER"){
				player_name=data.squad[i].name 
	  			return_string+=" - " + player_name + "  \n";
	  	 	}
		}
		return return_string
	}

	//if no match we display the all squad
	else{
		var return_string= "🎽 The "+ name + " all squad is composed of : \n";

		for (i = 0; i < num_results; i++) {
		player_name=data.squad[i].name 
	  	return_string+=" - " + player_name + "  \n";
		}
		return return_string
	}

	
}




