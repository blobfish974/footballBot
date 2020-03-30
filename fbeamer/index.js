'use strict'

const crypto = require('crypto');
const request = require('request');
const apiVersion = 'v6.0';

class FBeamer{
    constructor({pageAccessToken, VerifyToken, appSecret}){ 
        try {      
            this.pageAccessToken = pageAccessToken;
            this.VerifyToken = VerifyToken;
            this.appSecret = appSecret;
        } 
        catch(error) {
        console.error(error);
        }
    }

    registerHook(req, res) {
        const params = req.query;
        const mode = params['hub.mode'],
        token = params['hub.verify_token'],
        challenge = params['hub.challenge'];
        try {
            console.log(params);
            console.log(mode);
            console.log(token);
            console.log(this.VerifyToken);
            console.log(token == this.VerifyToken);
            if (mode === 'subscribe' && token === this.VerifyToken) {
            console.log("Webhook is registered");
            return res.send(challenge);
            } else {
                throw "Could not register webhook !";
                //return res.sendStatus(200);
            }
        } catch(e) {
        console.log(e);
        }
    }

    verifySignature (req, res, buf) {
        return (req, res, buf) => {
            if(req.method === 'POST') {
                try {
                    // get x-hub - signature here
                    /* this code generates a hash using the given appSecret */
                    let tempo_hash = crypto.createHmac('sha1', this.appSecret).update(buf, 'utf -8');
                    let hash = tempo_hash.digest('hex');
                    let hash_req = req.headers['x-hub-signature'];
                    hash_req = hash_req.substring(5);

                    if (hash == hash_req) {

                        console.log("Hash code verification is OK !");

                    }

                    else {
                        throw "Hash code verification go throw error !"
                    }                    
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    messageHandler(obj){
        let sender = obj.sender.id;
        let message = obj.message;
        if (message.text){
            let obj = {
                sender,
                type: 'text',
                content : message.text,
                message : message
            }
            return obj;
        }
    }


    incoming(req, res, cb) {
        res.sendStatus(200);
        // Extract the body of the POST request
        if(req.body.object === 'page' && req.body.entry) {
            let data = req.body ;
            //console.log(data);

            data.entry.forEach(pageObj => {
                //console.log(pageObj);
                if (pageObj.messaging) {
                    pageObj.messaging.forEach(messageObj => {
                        //console.log(messageObj)
                        //console.log("sender id : " + messageObj.sender.id);
                        //console.log("timeOfMessage :" + messageObj.timestamp);
                        //console.log("message : " + messageObj.message.text);
                        //console.log(this.messageHandler(messageObj)); 
                        //console.log(messageObj.postback)
                        if (messageObj.postback){
                            // handle postbacks
                        }
                        else{
                            // handle messages
                            return cb(this.messageHandler(messageObj));
                        }
                    })
                }
            })
        }       
    }

    sendMessage(payload){
        return new Promise (( resolve , reject ) => {
        request ({
            uri: `https://graph.facebook.com/${apiVersion}/me/messages`,
            qs:{
                access_token : this.pageAccessToken
            },
            method: 'POST',
            json: payload
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve({
                        mid: body . message_id
                    });
                } else {
                    reject(error);
                }
            });
        });
    }

    txt(id, text, messaging_type = 'RESPONSE'){
        /* this is an object for creating the payload according
        to table 1*/
        let obj = {
            messaging_type,
            recipient:{
                id
            },
            message: {
                text
            }
        }
        return this.sendMessage(obj);
    }


}



module.exports = FBeamer;