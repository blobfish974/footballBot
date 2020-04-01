'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const config = require('./config');
const fbeamer = require('./fbeamer');
const extractEntity = require('./football_data')
const sandbox_standing = require('./sandbox_standing');
const sandbox_scorer = require('./sandbox_scorer');
const sandbox_teams = require('./sandbox_teams');

const league_formater=require('./API/league_formatter');

const f = new fbeamer(config.FB);


const server = express();
const PORT = process.env.PORT || 3000;


//server.get('/', (req , res) => {res.send("hello !!"); console.log("connexion reussie");});
server.get('/', (req , res) => 
    {f.registerHook(req, res);
            });


server.post('/', bodyparser.json({
    verify: f.verifySignature.call(f),
}));

var last_team_requested;

server.post('/', (req, res, next) => {
    return f.incoming(req, res, async data => {
        try {
            //var message = req.body.entry[0].messaging[0].message;
            //console.log(message);
            //console.log(message.nlp.entities);
            //console.log(data);
            console.log(data.message.nlp.entities);

            if (data.content === 'bonjour') {
            //if ( data.content === 'the given text in facebook !') {
                await f.txt(data.sender, 'hey there I finally received your message in my chatbot :)))');
            }

            if (data.content === 'a') {
                //await f.txt(data.sender, "ok bien reçu");
                console.log("try to send image");
                //await f.sendImageMessage(data.sender, "https://via.placeholder.com/150");
                const psg_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/4/4a/Paris_Saint-Germain_Football_Club_%28logo%29.svg/240px-Paris_Saint-Germain_Football_Club_%28logo%29.svg.png";
                const om_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/4/43/Logo_Olympique_de_Marseille.svg/189px-Logo_Olympique_de_Marseille.svg.png";
                const ol_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/e/e2/Olympique_lyonnais_%28logo%29.svg/208px-Olympique_lyonnais_%28logo%29.svg.png"
                const losc_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/7/70/Logo_LOSC_Lille.svg/135px-Logo_LOSC_Lille.svg.png";
                const reims_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/0/02/Logo_Stade_Reims_1999.svg/240px-Logo_Stade_Reims_1999.svg.png";
                const nice_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/b/b1/Logo_OGC_Nice_2013.svg/193px-Logo_OGC_Nice_2013.svg.png";
                const rennes_logo="https://upload.wikimedia.org/wikipedia/fr/thumb/e/e9/Logo_Stade_Rennais_FC.svg/217px-Logo_Stade_Rennais_FC.svg.png";
                await f.sendImageMessage(data.sender, rennes_logo);
                await f.txt(data.sender, "c'est pas nice!");
            }

            if (data.content === 'je t\'aime') {
                await f.txt(data.sender, "moi aussi!!! <3 <3 <3 <3 <3");
            }

            var req_message=data.content.toUpperCase();
            if (req_message === 'GOALKEEPER' || req_message === 'DEFENDER' || req_message === 'MIDFIELDER' ||
                req_message === 'ATTACKER' || req_message === 'COACH' || req_message === 'ALL') {

                if (typeof last_team_requested !== 'undefined') {
                    // variable is not undefined or null
                    console.log("last_team_requested defined! ",last_team_requested);
                }
                //even if last_team_requested is undefined the functions will assign a default team to fetch
                
                //await f.txt(data.sender, "Wesh ma gueule je cherche les "+req_message);

                sandbox_teams.team_composition(last_team_requested,req_message).then( async res => {
                                await f.txt(data.sender, res);
                });
            }

            


            else {

                const entities=extractEntity(data.message.nlp.entities);
                //console.log("entities: ", entities);
                const intent =entities[0];
                console.log("intent : ", intent);
                const season =entities[1];
                console.log("season : ", season);
                const league =entities[2];
                console.log("league : ", league);
                const team =entities[3];
                console.log("team : ", team);

                //to be display (user readable)
                var league_found=league || "Ligue 1";
                console.log("league_found: ", league_found);

                //to be used (API readable)
                //var league_formated=league_formater(league);
                //console.log("league_formated: ", league_formated);
                
                switch(intent){

                    case "league standing":
                    await f.txt(data.sender, "I'm searching for the "+ league_found +" standing... 🔎🏅");
                        sandbox_standing.league_standing(league).then( async res => {
                            await f.txt(data.sender, res);
                        });
                        break;
                    
                    case "top team":
                    await f.txt(data.sender, "I'm searching for the "+ league_found +" best team... 💪");
                        sandbox_standing.best_team(league).then( async res => {
                            await f.txt(data.sender, res);
                        });
                        break;
                    
                    case "top scorers":
                        await f.txt(data.sender, "I'm searching for the "+ league_found +" top scorers...");
                        sandbox_scorer.top_scorers(league).then( async res => { 
                            await f.txt(data.sender, res);
                        });
                        break;
                    
                    case "top scorer":
                        await f.txt(data.sender, "I'm searching for the "+ league_found +" best scorer...");
                            sandbox_scorer.top_scorer(league).then( async res => {
                                await f.txt(data.sender, res);
                            });
                        break;

                    case "squad":

                        console.log("last_team_requested in squad before ",last_team_requested);
                        last_team_requested=team;
                        console.log("last_team_requested in squad after ",last_team_requested);

                        var squad_chooser="OK I'm looking for "+ team +" composition 📋🕵\n"
                        squad_chooser+="Please answer with the part of the team you want: "
                        squad_chooser+="goalkeeper, defender, midfielder, attacker, coach or all";
                        await f.txt(data.sender, squad_chooser);

                        /*await f.txt(data.sender, "seaching for the "+ team +" composition...");
                        sandbox_teams.team_composition(team).then( async res => {
                                await f.txt(data.sender, res);
                            });*/
                        break;
                    case "information":
                        sandbox_teams.team_information(team).then( async res => {// return [image_url,return_string]
                                var image_url=res[0];
                                var text=res[1];
                                await f.sendImageMessage(data.sender, image_url);
                                await f.txt(data.sender, text);
                        });
                        break;
                    default:
                        console.log("intent : ", intent, "team : ", team);
                        break;
                }
            }
        }
        catch (e){
            console.log(e);
        }
    });
});



server.listen(PORT, () => console.log(`The bot server is running on port ${PORT}`));