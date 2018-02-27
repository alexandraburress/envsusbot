var twit = require('twit');
var config = require('./config.js');

var Twitter = new twit(config);
var messages = ["Thank you for taking part in the converstion about environmental sustainability!"];
var messageLocation = 0;

var stream = Twitter.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    console.log(replyto + ' ' + from);

    if (replyto === 'csci428') {
        var newtweet = '@' + from + ' thank you for tweeting me!';
        tweetIt(newtweet);
    }
} 

var searchStream = Twitter.stream('public');
stream.on('tweet', search);

function tweetIt(txt) {

    var r = Math.floor(Math.random() * 100);

    var tweet = {
        status: txt + "/nTweet Code: " + r
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
}

function search(eventMsg) {
    Twitter.get('search/tweets', { q: 'asdfghj csci428', count: 10}, gotData);
    
    function gotData(err, data) {/*
        var tweets = data.statuses;
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }

        for (var i = 0; i < tweets.length; i++) {
            var replyto = data.user.screen_name;
            var from = data.user.screen_name;

            console.log(replyto + ' ' + from);
            var newtweet = '@' + from + ' Thank you for taking part in the converstion about environmental sustainability!';
            tweetIt(newtweet);
        }*/
    }
}
    

