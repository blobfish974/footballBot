
// return the Team associated number in the API 
//if none is found return the one for OM
const extractTeam = (team_string) =>{

	//BY DEFAULT
	/*
	String ligue1_1= "ligue 1";
	String ligue1_2= "FL1";
	var ligue1_compare1= ligue1_1.localeCompare(team_string, 'en', {sensitivity: 'base'});
	var ligue1_compare2= ligue1_2.localeCompare(team_string, 'en', {sensitivity: 'base'});*/
	if(team_string==null){
		return "FL1";
	}

	team_string=team_string.toUpperCase();
	var premier_league_1= "premier league".toUpperCase();
	var premier_league_2= "PL".toUpperCase();

	var bundesliga_1= "bundesliga".toUpperCase();
	var bundesliga_2= "BL1".toUpperCase();

	/*
	var premier_league_compare1= premier_league_1.localeCompare(team_string, 'en', {sensitivity: 'base'});
	var premier_league_compare2= premier_league_2.localeCompare(team_string, 'en', {sensitivity: 'base'});

	var bundesliga_1_compare1= bundesliga_1.localeCompare(team_string, 'en', {sensitivity: 'base'});
	var bundesliga_1_compare2= bundesliga_2.localeCompare(team_string, 'en', {sensitivity: 'base'});*/

	var premier_league_compare1= (premier_league_1==team_string);
	var premier_league_compare2= (premier_league_2==team_string)

	var bundesliga_1_compare1= (bundesliga_1==team_string)
	var bundesliga_1_compare2= (bundesliga_2==team_string)

	console.log(premier_league_compare1,premier_league_compare2,bundesliga_1_compare1,bundesliga_1_compare2);
    if (premier_league_compare1==1 || premier_league_compare2==1){
        return premier_league_2;
    }

    else if(bundesliga_1_compare1==1 || bundesliga_1_compare2==1){
        return bundesliga_2;
    }

    else{
        return "FL1";
    }
}

module.exports = extractTeam;
