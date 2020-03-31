# footbalBot
> football chatbot


**Table of Contents**
- [📖 Introduction](#-introduction)
- [💻 Installation](#-installation)



## 📖 Introduction

This chatbot answers football statistics in general. You can find a complete description of its functionnalities under the XXX chapter.

Here is the link to our Faceboook Page: [Footbal Bot](https://www.facebook.com/Football-Bot-110345200596257).

## 🏗 Installation 

#### Launch the server

First you need to launch the chatbot on your localhost in order to then expose it to Facebook Messenger.

```sh
❯ nodemon server.js
```

We recommend you to use nodemon (for developping) but it will work fine with the node command


#### Ngrok

To expose your local server use ngrok ([website](https://ngrok.com/)) 
```sh
❯ ./ngrok http 3000
```
You will then see an interface like this:

![ngrok](./img/ngrok.png)

note: the default port in our app is 3000 


#### Connect to facebook developpers


Now we need to connect our local server to our facebook app.
To do so, go to: https://developers.facebook.com/

Then under `Webhooks` click `EditSubscription` and change the callback URL with the one provided by ngrok (it should looks like `https://ad60c938.ngrok.io`).

You can find the verify token in config > development.json






## Notes for developping

----------------- USAGE --------

### Questions (all for Ligue 1):
- What are the top X scorers?
- What is the actual ligue standing?
- What are the defenders/midfielder/etc of XXX team?
- Who is the coach of XXX team?
Bonus:
- What are the match plained on the XXX days?
- What is the standing of XXX Team?


### Themes it asnwers:

- Top 10 scorer of Ligue 1: https://api.football-data.org/v2/competitions/FL1/scorers
	-> https://api.football-data.org/v2/competitions/FL1/scorers?limit=X for top X scorers

- Current Ligue 1 standing (top 3?) : https://api.football-data.org/v2/competitions/FL1/standings

- Show informations on 1 team: https://api.football-data.org/v2/teams/521 
	-> then ask for position (Goalkeeper, Defender, Midfielder, Attacker) and return list of players name
	-> ask for coach ("role": "COACH" and not "role": "PLAYER")

- CL 2019 round of 16 matches: https://api.football-data.org/v2/competitions/CL/matches?stage=ROUND_OF_16

- Matchs planned on Ligue 1 day 11: https://api.football-data.org/v2/competitions/FL1/matches?matchday=11



### Other:
	Information on Ligue 1: https://api.football-data.org/v2/competitions/FL1
	Show informations on 1 team: https://api.football-data.org/v2/teams/521
	CL 2019 matches: https://api.football-data.org/v2/competitions/CL/matches?season=2019

### USEFUL:
- Teams
    PSG: 524
    Olympique de Marseille: 516
    Stade Rennais FC 1901: 529
    Lille OSC: 521
    Stade de Reims: 547
    OGC Nice: 522
    Olympique Lyonnais: 523

- Competitions
    Ligue 1: FL1
    UEFA Champions League: UCL
    FIFA World Cup: WC
    Premier League: PL
    Bundesliga: BL1
- Stage for CCL:
  "stage": "ROUND_OF_16",
