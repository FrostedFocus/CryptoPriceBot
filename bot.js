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
var help = ['COMMANDS: `.eth`, `.ltc`, `.btc`, `.btc/eth/ltc<gdax,bfx>`, `.price <ticker>`, `.p <bfx/gdax>`'];
var list = new Array();
list.push('neo', 'omg', 'ark' );
var message = { listMsg:null};

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
function getMessageinfo(channel_id){
    bot.getMessage({
                channelID: channel_id}, function(error, message){
                    botMessageID = message[0].id;
                });
}
function deleteMsg(channel_id, message_id){
    

    var botMessageID;
    bot.getMessage({
                channelID: channel_id}, function(error, message){
                    botMessageID = message[0].id;
                    console.log(message[0]);
                
    
    setTimeout(function(){
    bot.deleteMessage({
            channelID: channel_id,
            messageID: message_id
        });
        
    bot.getMessage({
                channelID: channel_id}, function(error, message){
                    if(message[0].author.username == "testbot")
                    bot.deleteMessage({
                        channelID: channel_id,
                        messageID: message[0].id
                    });
                    
                });
        
    }, 4500);
    
                });//end of get message break.
}

function deleteMsg2(channel_id, message_id){
    

    var botMessageID;
    
    setTimeout(function(){
    bot.deleteMessage({
            channelID: channel_id,
            messageID: message_id
        });
    
    if(channel_id != 335327431684653069)    
    bot.getMessages({
                channelID: channel_id, limit: 25}, function(error, message){
                    for(i in message)
                        if(message[i].author.username == "testbot" || message[i].author.username == "Crypto Price Bot")
                        bot.deleteMessage({
                        channelID: channel_id,
                        messageID: message[i].id
                    });
                    
                });
        
    }, 80000);

}

function setMsg(msg){
    message.listMsg = msg;
    console.log(message.listMsg);
}

function fetch(url, channelID){ //fetch for cmc api
        var temp = request(url, function (err, response, body) {
                      if(err)
                        throw err;
                        
                       var data = JSON.parse(body);

                       if(data.error){
                          console.log('error no entry');
                          msg = "*Nothing Found*";
                          setMsg(msg);
                        } else {
                          var weather = JSON.parse(body)
                          msg = "**` " + weather.symbol + ": ";
                          msg +="$"+ weather.price.usd + "`/`"+ weather.price.btc+"BTC`**\n";
                          //console.log("?" + msg);
                          bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : msg
                            });
                        }
                   })
}
        
//In this function we're going to add our commands.
bot.on("message", function (user, userID, channelID, message, rawEvent) {
    
    if (message.substring(0, 1) == ".") {
        var argument = message.substring(1).split(" ");
        var command = argument[0].toLowerCase();
        argument = argument.splice(1);

        if (command == "ping") {//If the user posts '!ping' we'll do something!
            bot.sendMessage({ //We're going to send a message!
                to : channelID,
                message : "Pong!"
            });
            
            setTimeout(function(){
                
            bot.deleteMessage({
                channelID: rawEvent.d.channel_id,
                messageID: rawEvent.d.id
            });
                
            //bot.getMessage({
            //    channelID: rawEvent.d.channel_id}, function(error, message){ console.log(message)});
                
                  }, 10000);
              

        }
        
        else if (command == "ans" || command == "neo" ) {//If the user posts '!ping' we'll do something!
           var msg = "`NEO: ";
           var url = 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=usdt-neo';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result[0].Last);

                  msg +="$"+ weather.result[0].Last + "`";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                    
                    
                  deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                    
                }
           })
           
        }
        
        
        //Original OMG Command
        /*
        else if (command == "omg") {//If the user posts '!ping' we'll do something!
           var msg = "`OMG (BFX): ";
           var url = 'https://api.cryptowat.ch/markets/bitfinex/omgusd/price';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                    
                  deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                }
           })
        }*/
        
        //New 
        else if (command == "omg") {//If the user posts '!ping' we'll do something!
            var msg = "**```diff\nOMG: ";
           var url = 'https://api.cryptowat.ch/markets/bitfinex/omgusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/bitfinex/omgusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                        }
                    })
                }
           })
        }
        //end
        
        
        
        else if (command == "bch") {//If the user posts '!ping' we'll do something!
           var msg = "`BCH (BFX): ";
           var url = 'https://api.cryptowat.ch/markets/bitfinex/bchusd/price';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
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
                deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                }
           })
        }
        
        else if (command == "bts") {//If the user posts '!ping' we'll do something!
           var msg = "`Bitshares: ";
           var url = 'https://coinmarketcap-nexuist.rhcloud.com/api/bts';
           request(url, function (err, response, body) {
               if(err || body.charAt(0) == '<'){
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
                deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                }
           })
           
        }
        
        /*Simple read....
        if (command == "eth") {//If the user posts '!ping' we'll do something!
            var msg = "`ETH: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
            
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";

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
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
            else if(argument[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
            
           request(url, function (err, response, body) {
               
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";

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
            if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
            else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
           request(url, function (err, response, body) {
               if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)
                  console.log(weather.result.price)

                  msg +="$"+ weather.result.price + "`";
                  
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }*/
        
        else if (command == ".a") {//If the user posts '!ping' we'll do something!
        if(!argument[0])
            argument[0] = "btc";
            var msg = "**`" + argument[0].toUpperCase() + ": ";
            //console.log(argument.toUpperCase());
           var url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + argument[0];
           request(url, function (err, response, body) {
               var data = JSON.parse(body);
               if(data.error){
                  //console.log(user)
                  console.log('error no entry' + command);
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "*Nothing Found*"
                    });
                } else {
                  var weather = JSON.parse(body)
                  //console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "`**";
                  
                  /*Send message*/
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                }
           })
        }
        
        else if (command == "list") {//Request all tickers in list.
        if(argument[0]=='add')
            list.push(argument[1]);
        else if(argument[0]=='remove'){
            var index = list.indexOf(argument[1]);
            if (index > -1) {
                list.splice(index, 1);
            }
        }
            
        else{
            var msg = "";
            var msg = "Saved tickers:  \n";
            for(i in list){
                msg += "**"+list[i] + "**, ";
            }
            bot.sendMessage({ //We're going to send a message!
                    to : channelID,
                    message : msg
                });
            }
        }
        
        else if (command == "prices" || command == "price") {//Request all tickers in list.

            
            //var url = `https://api.cryptowat.ch/markets/gdax/btcusd/price`
        for(i in list){
            url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + list[i].toLowerCase();
            (fetch(url, channelID));
        }
        deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
        }
        
        
        /*Same as .prices but this is to have emojiis*/
        else if (command == "p") {//If the user posts '!ping' we'll do something!
        /*Do API request and parse into a message*/
        var url = "https://api.cryptowat.ch/markets/gdax/btcusd/price";
        
        if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
        else if(argument[0]=='gdax')
            var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
        else if(argument[0]=='polo')
            var url = 'https://api.cryptowat.ch/markets/poloniex/btcusd/price';
        else
            argument[0]='gdax';
            
        //var wholemsg = "`Prices in USD ("+argument[0].toUpperCase()+"):`\n";
        //Try 2 cleaner
        var wholemsg = "";
            request.get('https://api.cryptowat.ch/markets').on('response', function(response){
                //console.log(response.body)
            } )
            
            //var url = `https://api.cryptowat.ch/markets/gdax/btcusd/price`
            request(url, function (err, response, body) {
                if(err){
                  console.log('error')
                } else {
                  var weather = JSON.parse(body)

                  var string1 = wholemsg + "<:BTC:338428982498426893> **- $"+ weather.result.price + "**\n";
                }
                
                    //Second thread=======================
                    if(argument[0]=='bfx')
                        url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
                    else if(argument[0]=='gdax')
                        url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
                    else if(argument[0]=='polo')
                        url = 'https://api.cryptowat.ch/markets/poloniex/ethusd/price';
                    else
                    url = `https://api.cryptowat.ch/markets/gdax/ethusd/price`
                    request(url, function (err, response, body) {
                    if(err){
                      console.log('error')
                    } else {
                      var weather = JSON.parse(body)
    
                      var string2 = string1 + "<:ETH:338428982808805388> **- $"+ weather.result.price + "**\n";
                    }
                    
                        //Third Thread----------------------
                        if(argument[0]=='bfx')
                        url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
                        else if(argument[0]=='gdax')
                            url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
                        else if(argument[0]=='polo')
                            url = 'https://api.cryptowat.ch/markets/poloniex/ltcusd/price';
                        else
                        url = `https://api.cryptowat.ch/markets/gdax/ltcusd/price`
                        request(url, function (err, response, body) {
                        if(err){
                          console.log('error')
                        } else {
                          var weather = JSON.parse(body)
        
                          var string3 = string2 + "<:LTC:338428982703816705> **- $"+ weather.result.price + "**\n";
                        }
                        
                        //Everything done, output msg.
                        //string3 += "    __**("+argument[0].toUpperCase()+")**__          \n"
                        bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : string3
                        });
                    })//end of thread 3
                })//end of thread 2
            })//end of thread1
        }
        
        
        /*Let's try to do prices with change summary*/
        
        else if (command == "help") {
        /*Do API request and parse into a message*/
           bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : help
            });
            

        }
        
        else if (command == "pin") {
        /*Do API request and parse into a message*/
            console.log(argument);
            bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "```diff\n+100\n```"
            });

        }
        
        else if (command == "tip" || command == "tips") {
        /*Do API request and parse into a message*/
            var address = "BTC: <17pujAWF5Xo17kZ8s5sk2tpxtUrHUGiSyd> \nETH: <0x4c3CCcE0F1F09BB7F2ea34A7101932F9C186209c>"
            bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : "```markdown\n"+address+"\n```"
            });

        }
        
        else if (command == "btc") {
            var msg = "**```diff\n BTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/price';
           
           
           
           
           
           
           
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/btcusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/btcusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                        }
                    })
                }
           })
        }
        //end
        
        else if (command == "eth") {//If the user posts '!ping' we'll do something!
            var msg = "**```diff\n ETH: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/price';
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ethusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/ethusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                        }
                    })
                }
           })
        }
        //end
        
        else if (command == "ltc") {//If the user posts '!ping' we'll do something!
            var msg = "**```diff\n LTC: ";
           var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/price';
           if(argument[0]=='bfx')
            var url = 'https://api.cryptowat.ch/markets/bitfinex/ltcusd/price';
           request(url, function (err, response, body) {
               if(err){ console.log('error')} 
               else {
                  var weather = JSON.parse(body)
                  msg +="$"+ weather.result.price + " \n";
                  
                  /*Thread 2*/
                  var url = 'https://api.cryptowat.ch/markets/gdax/ltcusd/summary';
                  request(url, function (err, response, body) {
                    if(err){ console.log('error')} 
                       else {
                        var weather = JSON.parse(body)
                        var change = weather.result.price.change.absolute.toString();
                        var percent = (weather.result.price.change.percentage*100).toString();
                        if( change.substring(0,1) == "-")
                            msg+= "" + change.substring(0,1) + "$"+ change.substring(1,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**"
                        else
                            msg+= "+" + "$"+ change.substring(0,7) + " (" + percent.substring(0,7)+ "%) - 24 HR\n```**";
                        
                        /*Send message*/
                        bot.sendMessage({ //We're going to send a message!
                         to : channelID,
                         message : msg
                        });
                        deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                        
                        }
                    })
                }
           })
        }
        //end
        
        else {
            var msg = "**```diff\n" + command.toUpperCase() + ": ";
            //console.log(argument.toUpperCase());
           var url =  'https://coinmarketcap-nexuist.rhcloud.com/api/' + command.toLowerCase();
           request(url, function (err, response, body) {
               if(err)
                throw err;
                
                console.log("body: " + body)
                if(body.charAt(0) != '<')
                    var data = JSON.parse(body);
                    
                //Not Top 100 coin. -- Using cmc api
               if(data.error || data == undefined){
                  console.log(data.error)
                  //search coinmarketcap THREAD: 2
                  var url =  'https://api.coinmarketcap.com/v1/ticker/' + command.toLowerCase();
                  request(url, function (err, response, body) {
                      if(err)
                        throw err;
                        
                       var data = JSON.parse(body);
                       //console.log(data);
                       if(data.error || command.length < 3){
                          //console.log(user)
                          console.log('error no entry' + command);
                          bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : "*Nothing Found*"
                            });
                        } else {
                          var weather = JSON.parse(body)
                          var change = weather[0].percent_change_24h;
                          //console.log(weather.price.usd)
                          //redo message
                          msg = "**```diff\n" + weather[0].symbol + ": ";
                          msg +="$"+ weather[0].price_usd + "/"+ weather[0].price_btc+" BTC\n";
                          
                          if( change.substring(0,1) == "-")
                             msg+= "-" + "(" + change.substring(1,7)+ "%) - 24 HR\n```**"
                          else
                             msg+= "+"  + "(" + change.substring(0,7)+ "%) - 24 HR\n```**";
                          
                          bot.sendMessage({ //We're going to send a message!
                                to : channelID,
                                message : msg
                            });
                            
                          deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                            
                        
                        }
                   })
                    
                    
                } else {
                  var weather = JSON.parse(body)
                  var change = weather.change;
                  //console.log(weather.price.usd)

                  msg +="$"+ weather.price.usd + "\n";
                    if( change.substring(0,1) == "-")
                        msg+= "-" + "(" + change.substring(1,7)+ "%) - 24 HR\n```**"
                    else
                        msg+= "+"  + "(" + change.substring(0,7)+ "%) - 24 HR\n```**";
                            
                           // weather.change + "%```**";
                  
                  bot.sendMessage({ //We're going to send a message!
                        to : channelID,
                        message : msg
                    });
                    
                  deleteMsg2(rawEvent.d.channel_id, rawEvent.d.id);
                }
           })
        }
    }

});



/*1.Parse(!command) 2.Match and perform message */
