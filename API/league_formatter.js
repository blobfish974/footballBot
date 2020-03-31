
// return the associated string in the API for a given ligue string
//if none is found return the one for Ligue 1
const extractLeague = (league_string) =>{

	//BY DEFAULT
	/*
	String ligue1_1= "ligue 1";
	String ligue1_2= "FL1";
	var ligue1_compare1= ligue1_1.localeCompare(league_string, 'en', {sensitivity: 'base'});
	var ligue1_compare2= ligue1_2.localeCompare(league_string, 'en', {sensitivity: 'base'});*/
	if(league_string==null){
		return "FL1";
	}

	league_string=league_string.toUpperCase();
	var premier_league_1= "premier league".toUpperCase();
	var premier_league_2= "PL".toUpperCase();

	var bundesliga_1= "bundesliga".toUpperCase();
	var bundesliga_2= "BL1".toUpperCase();

	/*
	var premier_league_compare1= premier_league_1.localeCompare(league_string, 'en', {sensitivity: 'base'});
	var premier_league_compare2= premier_league_2.localeCompare(league_string, 'en', {sensitivity: 'base'});

	var bundesliga_1_compare1= bundesliga_1.localeCompare(league_string, 'en', {sensitivity: 'base'});
	var bundesliga_1_compare2= bundesliga_2.localeCompare(league_string, 'en', {sensitivity: 'base'});*/

	var premier_league_compare1= (premier_league_1==league_string);
	var premier_league_compare2= (premier_league_2==league_string)

	var bundesliga_1_compare1= (bundesliga_1==league_string)
	var bundesliga_1_compare2= (bundesliga_2==league_string)

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

module.exports = extractLeague;
