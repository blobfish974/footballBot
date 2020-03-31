
// return the Team associated number in the API 
//if none is found return the one for OM
const extractTeam = (team_string) =>{


	if(team_string==null){
		return 516;
	}

	team_string=team_string.toUpperCase();

	//by default
	/*var om_1= "olympique de marseille".toUpperCase();
	var om_2= "OM".toUpperCase();
	var om_3= "marseille".toUpperCase();*/

	var psg_1= "paris saint germain".toUpperCase();
	var psg_2= "PSG".toUpperCase();
	var psg_3= "Paris".toUpperCase();

	var ren_1= "Stade Rennais".toUpperCase();
	var ren_2= "REN".toUpperCase();
	var ren_3= "rennes".toUpperCase();

	var losc_1= "Lille OSC".toUpperCase();
	var losc_2= "LOSC".toUpperCase();
	var losc_3= "lille".toUpperCase();

	var reims_1= "Stade de Reims".toUpperCase();
	var reims_2= "SR".toUpperCase();
	var reims_3= "reims".toUpperCase();

	var nice_1= "OGC Nice".toUpperCase();
	var nice_2= "OGC".toUpperCase();
	var nice_3= "Nice".toUpperCase();

	var ol_1= "Olympique Lyonnais".toUpperCase();
	var ol_2= "OL".toUpperCase();
	var ol_3= "Lyon".toUpperCase();



	var psg_compare_1= (psg_1==team_string);
	var psg_compare_2= (psg_2==team_string);
	var psg_compare_3= (psg_3==team_string);

	var ren_compare_1= (ren_1==team_string);
	var ren_compare_2= (ren_2==team_string);
	var ren_compare_3= (ren_3==team_string);

	var losc_compare_1= (losc_1==team_string);
	var losc_compare_2= (losc_2==team_string);
	var losc_compare_3= (losc_3==team_string);

	var reims_compare_1= (reims_1==team_string);
	var reims_compare_2= (reims_2==team_string);
	var reims_compare_3= (reims_3==team_string);

	var nice_compare_1= (nice_1==team_string);
	var nice_compare_2= (nice_2==team_string);
	var nice_compare_3= (nice_3==team_string);

	var ol_compare_1= (ol_1==team_string);
	var ol_compare_2= (ol_2==team_string);
	var ol_compare_3= (ol_3==team_string);

    if (psg_compare_1==1 || psg_compare_2==1 || psg_compare_3==1){
    	console.log("PSG identified by formatter");
        return 524;
    }

    else if (ren_compare_1==1 || ren_compare_2==1 || ren_compare_3==1){
    	console.log("Stade Rennais FC identified by formatter");
        return 529;
    }

    else if (losc_compare_1==1 || losc_compare_2==1 || losc_compare_3==1){
        console.log("LOSC FC identified by formatter");
        return 521;
    }

    else if (reims_compare_1==1 || reims_compare_2==1 || reims_compare_3==1){
        console.log("Reims FC identified by formatter");
        return 547;
    }

    else if (nice_compare_1==1 || nice_compare_2==1 || nice_compare_3==1){
    	console.log("OGC Nice FC identified by formatter");
        return 522;
    }

    else if (ol_compare_1==1 || ol_compare_2==1 || ol_compare_3==1){
    	console.log("OL FC identified by formatter");
        return 523;
    }

    else{
    	console.log("OM chosen by formatter");
        return 516;
    }
}

module.exports = extractTeam;
