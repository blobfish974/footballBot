'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const config = require('./config');
const fbeamer = require('./fbeamer');
const extractEntity = require('./football_data')
const sandbox = require('./sandbox2');


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
                await f.txt(data.sender, "ok bien reçu");
            }

            if (data.content === 'je t\'aime') {
                await f.txt(data.sender, "moi aussi!!! <3 <3 <3 <3 <3");
            }

            else {
                const intent = extractEntity(data.message.nlp.entities, "intent");
                console.log("intent : ", intent);
                const season = extractEntity(data.message.nlp.entities, "season");
                //console.log(season);
                const league = extractEntity(data.message.nlp.entities, "league");
                console.log("league: ", league);
                const team = extractEntity(data.message.nlp.entities, "team");
                //console.log(team);

                switch(intent){

                    case "league standing":
                        sandbox.best_team().then( async res => { 
                            //await f.txt(data.sender, res["team"].name);
                            res = JSON.stringify(res["team"]);
                            //console.log(res);
                            await f.txt(data.sender, res);
                        });
                        //sandbox.league_standing();
                        break;
                    
                    case "top team":
                        sandbox.best_team();
                        break;
                    
                    case "top scorers":
                        sandbox.top_scorers();
                        break;
                    
                    case "top scorer":
                        sandbox.top_scorer();
                        break;

                    default:
                        console.log("intent : ", intent, "team : ", team);
                        break;
                }

               
                //if (entity == "fgdgfs")
            }
        }
        catch (e){
            console.log(e);
        }
    });
});



server.listen(PORT, () => console.log(`The bot server is running on port ${PORT}`));