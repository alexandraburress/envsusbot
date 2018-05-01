// Blank copy of Twitter Bot
var twit = require('twit');
var config = require("./blankconfig.js");
var Twitter = new twit(config);


//Begin the code to auto-tweet -> https://www.youtube.com/watch?v=Fn6k-7zvo4w
//This contains the tweets the bot will tweet. 
var messages = ["Hello, World!", ""]


//which message to send, start at the first one
var messageLocation = 0;


function writeTweet(txt) {
    //Twitter won't let you tweet the same tweet multiple times, so we put a random 
    //number in the body to differentiate it
    var r = Math.floor(Math.random() * 100);
    var tweet = {
        //this is the actual text of the tweet
        status: r + ": " + txt
    }
    Twitter.post('statuses/update', tweet, tweeted);
    function tweeted(err, data, response) {
        if (err) {
            console.log("Error");
        }
        else {
            console.log("Success");
        }
    }
    //go through messages-- if at end, reset
    if (messageLocation < messages.length) {
        messageLocation += 1;
    }
    else {
        messageLocation = 0;
    }
}


let autoTweet = function () {
    writeTweet(messages[messageLocation]);
}
setInterval(autoTweet, 300000);
//to set how often it tweets-> desired minutes * 60,000
//300,000 = every 5 minutes 
//150,000 = every 2.5 minutes


//Begin the code to reply to people who mention the bot -> https://www.youtube.com/watch?v=ovOtQxLwSzQ
var stream = Twitter.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    console.log("To: " + replyto + " From: " + from);
    //insert your bot's @ handle here, minus the @
    if (replyto === '') {
        //adding the message is optional, you can make it reply whatever you want
        var newtweet = '@' + from + ' thanks for tweeting me! ' + messages[messageLocation];
        writeTweet(newtweet);
    }
}


