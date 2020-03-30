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

module.exports = extractEntity;