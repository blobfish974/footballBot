
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

	position=data.standings[0].table[0].position 
	name=data.standings[0].table[0].team.name
	points=data.standings[0].table[0].points
	return_string+="   - 🥇: " + name + " with " + points + " points \n";

	position=data.standings[0].table[1].position //0 for total ranking (exist home and exterior ranking too)
	name=data.standings[0].table[1].team.name
	points=data.standings[0].table[1].points
  	return_string+="   - 🥈: " + ": " + name + " with " + points + " points \n";

	position=data.standings[0].table[2].position //0 for total ranking (exist home and exterior ranking too)
	name=data.standings[0].table[2].team.name
	points=data.standings[0].table[2].points
	return_string+="   - 🥉: " + ": " + name + " with " + points + " points \n";

	for (i = 3; i < num_results; i++) {
		key='team'+i.toString();
		position=data.standings[0].table[i].position //0 for total ranking (exist home and exterior ranking too)
		name=data.standings[0].table[i].team.name
		points=data.standings[0].table[i].points
	  	return_string+="   - "+ (i+1) + " : " + name + " with " + points + " points \n";
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

exports.teamInformations = data => {// return an array with image, text, website url, email, phone number

	return_array=[]


	//1rst let's find the appropriate image and email for the club!
	//the command 'mailto:' is blocked par Facebook so we had to create custom URL
	var image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/4/43/Logo_Olympique_de_Marseille.svg/189px-Logo_Olympique_de_Marseille.svg.png";
	var email="https://tinyurl.com/uhuq52g";

	tla=data.tla //initials from the club in the API
	if (tla === 'PSG'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4a/Paris_Saint-Germain_Football_Club_%28logo%29.svg/240px-Paris_Saint-Germain_Football_Club_%28logo%29.svg.png";
		//mailto:communaute@psg.fr
        email="https://tinyurl.com/uj7m6uc"
	}
	else if (tla === 'NIC'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/b/b1/Logo_OGC_Nice_2013.svg/193px-Logo_OGC_Nice_2013.svg.png";
		//mailto:ogcnice.association@orange.fr
		email="https://tinyurl.com/ukxwbdk";
    }
    else if (tla === 'REN'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/e/e9/Logo_Stade_Rennais_FC.svg/217px-Logo_Stade_Rennais_FC.svg.png";
		//mailto:4500015@footlbf.fr
		email="https://tinyurl.com/yx4ys6tp" //probably isn't a good email adresse
	}
	else if (tla === 'LIL'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/7/70/Logo_LOSC_Lille.svg/135px-Logo_LOSC_Lille.svg.png";
		//mailto:losclillemetropole.500054@ligue59-62.fr
		email="https://tinyurl.com/qp9awv";
	}
	else if (tla === 'SDR'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/0/02/Logo_Stade_Reims_1999.svg/240px-Logo_Stade_Reims_1999.svg.png";
		//mailto:contact@stade-de-reims.com
		email="https://tinyurl.com/vj9wfxk";
	}
    else if (tla === 'LYO'){
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/e/e2/Olympique_lyonnais_%28logo%29.svg/208px-Olympique_lyonnais_%28logo%29.svg.png";
		//mailto:olympique-lyonnais@lrafoot.org
        email="https://tinyurl.com/udos9xm";
	}          
	else{ //by default = OM
		image_url="https://upload.wikimedia.org/wikipedia/fr/thumb/4/43/Logo_Olympique_de_Marseille.svg/189px-Logo_Olympique_de_Marseille.svg.png";
    	//mailto:om@olympiquedemarseille.com
    	email="https://tinyurl.com/uhuq52g";
    }

    //Then we generate the text for the club

	var name=data.name;
	var founded=data.founded;
	var venue=data.venue;
	var website=data.website;
	//var email=data.email;
	var phone=data.phone;


	var return_string = "The "+ name + " was founded in " + founded;
	return_string += ". Its official stadium is " + venue;
	//return_string += ".\nWebsite: " + website;


	return [image_url,return_string,website,email,phone];
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




