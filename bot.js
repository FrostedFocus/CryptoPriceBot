//First of all, we need to load the dependencies we downloaded!
var logger = require("winston"); //What is winston?
var Discordbot = require('discord.io');

var Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();

/*** API SHIT **/
var request = require('request');

/*var _GDAX = require('./src/classes/GDAX');
var _CoinMarketCap = require('/src/classes/CoinMarketCap');
var _commander = require('commander');
var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_commander2.default.version('1.0.0');
var GDAX_MAP = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  LTC: 'Litecoin'
};*/

/*client.connect()

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log('Connected as: ' + client.User.Username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    if(e.message.content == 'PING'){
        e.message.channel.sendMessage('PONG');
    }
});*/
var help = ['COMMANDS: `.eth`, `.ltc`, `.btc`, `.btc/eth/ltc<gdax,bfx>`, `.price <ticker>`, `.prices <bfx/gdax>`'];

//Let's change some settings!
logger.remove(logger.transports.Console);   
logger.add(logger.transports.Console, {
    colorize : true
});
logger.level = 'debug';

var auth = require("./auth.json"); //json variable

//Here we create our bot variable, this is what we're going to use to communicate to discord.
var bot = new Discordbot.Client({ //Object construct
        //email : auth.email, //<-- This is the email from your auth file.
        //password : auth.password,//<-- This is the password from your auth file.
        token: "MzMwMzY3MTA2OTA0NDg5OTg0.DDf96A.GSrCoOXUktFNFCd94cHa7ofuZuw",
        autorun : true,
        game: "with myself."

    });
    
bot.on("ready", function (rawEvent) { //init commands
    logger.info("Connected!");
    logger.info("Logged in as: ");
    logger.info(bot.username + " - (" + bot.id + ")");

});

/***TRASH*/
bot.on('presence', function() { 
    bot.setPresence({
	game:{
		name:"With Myself"
	}
    });
    
});
bot.setPresence({
	game:{
		name:"With Myself"
	}
    });

//bot.user.setGame("with my self");

//In this function we're going to add our commands.
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    if (message.substring(0, 1) == ".") {
        var arguments = message.substring(1).split(" ");
        var command = arguments[0].toLowerCase();
        arguments = arguments.splice(1);

        if (command == "ping") {//If the user posts '!ping' we'll do something!
            bot.sendMessage({ //We're going to send a message!
                to : channelID,
                message : "Pong!"
            });
        }
        
        if (command == "ans") {//If the user posts '!ping' we'll do something!
           var msg = "`ANS: ";
           var url = 'https://coinmarketcap-nexuist.rhcloud.com/api/ans';
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
           
        }
        
        if (command == "bts") {//If the user posts '!ping' we'll do something!
           var msg = "`Bitshares: ";
           var url = 'https://coinmarketcap-nexuist.rhcloud.com/api/bts';
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
           
        }
        
        if (command == "eth") {//If the user posts '!ping' we'll do something!
            var msg = "`ETH: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            if(arguments[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
            else if(arguments[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "btc") {//If the user posts '!ping' we'll do something!
            var msg = "`BTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
           if(arguments[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
            else if(arguments[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
            else if(arguments[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
            
           request(url, function (err, response, body) {
               
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "ltc") {//If the user posts '!ping' we'll do something!
            var msg = "`LTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
            if(arguments[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
            else if(arguments[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "price") {//If the user posts '!ping' we'll do something!
            var msg = "`" + arguments[0].toUpperCase() + ": ";
            //console.log(arguments.toUpperCase());
           var url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + arguments[0];
           request(url, function (err, response, body) {
               var data = JSON.parse(body);
               if(data.error){
                   console.log(user)
                  console.log('error')
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "nothing"
                    });
                } else {
                  var weather = JSON.parse(body)
                  //console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        if (command == "prices") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
        var url = "https://api.cryptowat.ch/markets/gdax/btcusd/price";
        
        if(arguments[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
        else if(arguments[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
        else if(arguments[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
        else
            arguments[0]='gdax';
            
        var wholemsg = "```Prices in USD ("+arguments[0].toUpperCase()+"):\n====================  \n";
            request.get('https://api.cryptowat.ch/markets').on('response', function(response){
                //console.log(response.body)
            } )
            
            //var url = `https://api.cryptowat.ch/markets/gdax/btcusd/price`
            request(url, function (err, response, body) {
                if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)

                  var string1 = wholemsg + "BTC - $"+ weather.result.price + "\n";
                }
                
                    //Second thread=======================
                    url = `https://api.cryptowat.ch/markets/gdax/ethusd/price`
                    request(url, function (err, response, body) {
                    if(err){
                      console.log('error')
                    } else {
                      var weather = JSON.parse(body)
    
                      var string2 = string1 + "ETH - $"+ weather.result.price + "\n";
                    }
                    
                        //Third Thread----------------------
                        url = `https://api.cryptowat.ch/markets/gdax/ltcusd/price`
                        request(url, function (err, response, body) {
                        if(err){
                          console.log('error')
                        } else {
                          var weather = JSON.parse(body)
        
                          var string3 = string2 + "LTC - $"+ weather.result.price + "\n";
                        }
                        
                        //Everything done, output msg.
                        bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : string3 + "```"
                        });
                
                
                    })//end of thread 3
                    
                
                
                })//end of thread 2

                
            })//end of thread1
            
            
            
                

        }
        //setTimeout(function2, 3000);
        /**
        if (command == "911") {//If the user posts '!ping' we'll do something!
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "\:man_with_turban::skin-tone-5:  ........ \::airplane_departure: "});
            }, 700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : ".... \:man_with_turban::skin-tone-5:  ... \::airplane_departure:"});
            }, 1700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : ".................. \::airplane_departure:"});
            }, 2700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "\:airplane: \:cloud:  \:cloud:  \:cloud: "});
            }, 3700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "\:cloud: \:airplane: :cloud:  \:cloud: "});
            }, 4700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "\:cloud: \:cloud: \:airplane:  \:cloud: "});
            }, 5800);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "\ ..............\:cityscape:  \:cityscape:  "});
            }, 6700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : ".\:airplane:.......\:cityscape:  \:cityscape:  "});
            }, 7700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "....\:airplane:...\:cityscape:  \:cityscape:  "});
            }, 8700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : ".........\:boom:  \:cityscape:  "});
            }, 9700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "............\:boom:..\:boom:  "});
            }, 10700);
            setTimeout(function() {  
                bot.sendMessage({ to : channelID, message : "............\:boom:  \:boom:  "});
            }, 11700);
        }**/
        
        if (command == "help") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
           bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : help
            });
            

        }
        
        if (command == "pin") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
            console.log(arguments);
            bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "\:airplane:"
            });

        }
    }

});



/*1.Parse(!command) 2.Match and perform message */