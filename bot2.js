var twit = require('twit');
var config = require("./config.js");

var Twitter = new twit(config);


//Begin the code to auto-tweet -> https://www.youtube.com/watch?v=Fn6k-7zvo4w
//info from www.50waystohelp.com
var messages = ["Did you know you can save power by taking shorter showers? If you're really ambitious, try to keep it under 5 minutes!",
    "Bringing your own bags to the supermarket can keep plastic out of landfills. Plastic takes at least 450 years to decompose!",
    "Make sure to recycle your newspapers! 44 million are thrown away every day. Even if you recycle only once per week, half a million trees could be saved!",
    "Turning the tap off while brushing your teeth can save up to 5 gallons of water a day!",
    "Use your cruise control, even when you're not on the interstate! This will help to improve your mileage at least by 15%, which will in the process save the environment, gasoline and your wallet.",
    "Where possible, buy local produce. This saves all the pollution incurred by transporting goods long distance!",
    "Adjusting the temperature in your home by just one degree can save you 10% on your energy use over the year. This benefits both you and the planet!",
    "Invest in travel mugs or reusable water bottles! This saves on waste and keeps your coffee warmer and your water cooler longer :)",
    "Remember to always recycle glass and aluminum! It's possible to make 20 recycled cans with the same amount of energy it takes to make just one new one, & every ton of glass recycled saves 9 gallons of oil used for fuel to produce new glass.",
    "Choose matches over lighters! 1.5 billion disposable lighters containing plastic and butane end up in landfills every year.",
    "Download your software instead of buying disks! It's often cheaper and it reduces wasted packaging materials.",
    "Use a reusable spoon to stir your coffee! Every year, 138 billion straws and stirrers are thrown away in the USA.",
    "Pay bills online! Not only is it quick and convenient, If every US household received electronic statements, then we could save 18.5 million trees, 2.2 billion tons of greenhouse gases, and 1.7 billion pounds of solid waste per year."]

var symbols = ["\u{10084}", "\u{09728}", "\u{09733}", "\u{09786}", "\u{10051}", "\u{09835}", "\u{08258}", "\u{09834}", "\u{09883}", "\u{09913}", "\u{09956}", "\u{09790}", "\u{09784}", "\u{09925}", "\u{09928}", "\u{09889}", "\u{10051}", "\u{10032}", "\u{10037}", "\u{10035}"]

//which message to send
var messageLocation = 0;
let symCnt = symbols.length;
let num = 100 - symCnt;

function writeTweet(txt) {
    var r = (Math.floor(Math.random() * 100) - num);

    var tweet = {
        status: txt + "\n" + symbols[r]
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


setInterval(autoTweet, 15000);
//to set how often it tweets-> desired minutes * 30,000
//150,000 = every 5 minutes 75000


//Begin the code to reply to people who mention the bot -> https://www.youtube.com/watch?v=ovOtQxLwSzQ
var stream = Twitter.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    console.log("To: " + replyto + " From: " + from);

    if (replyto === 'csci428') {
        var newtweet = '@' + from + ' thanks for tweeting me! ' + messages[messageLocation];
        writeTweet(newtweet);
    }
}

