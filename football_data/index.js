
//return all entities in this order: intent, season, league, team 
const extractEntityAll = (nlp) =>{

    var intent=null
    var season=null
    var league=null
    var team=null
    if (nlp.intent != undefined && nlp.intent[0].confidence >= 0.5){
        intent=nlp.intent[0].value;
    }

    if(nlp.season != undefined && nlp.season[0].confidence >= 0.5){
        season=nlp.season[0].value;
    }

    if (nlp.league != undefined && nlp.league[0].confidence >= 0.5){
        league=nlp.league[0].value;
    }

    if (nlp.team != undefined && nlp.team[0].confidence >= 0.5){
        team=nlp.team[0].value;
    }

    return [intent,season,league,team];
}

//return the value for only one entity (given in parmameter)
const extractEntity = (nlp, entity) =>{ 
    // should be filled by you .
    //console.log(entity);
    if (entity == "intent" && nlp.intent != undefined && nlp.intent[0].confidence >= 0.5){
        return nlp.intent[0].value;
    }

    else if(entity == "season" && nlp.season != undefined && nlp.season[0].confidence >= 0.5){
        return nlp.season[0].value;
    }

    else if (entity == "league" && nlp.league != undefined && nlp.league[0].confidence >= 0.5){
        return nlp.league[0].value;
    }

    else if (entity == "team" && nlp.team != undefined && nlp.team[0].confidence >= 0.5){
        return nlp.team[0].value;
    }

    else{
        return null;
    }
}

//module.exports = extractEntity;
module.exports = extractEntityAll;