var twit = require('twit');
var config = require("./config.js");
var Twitter = new twit(config);


//Begin the code to auto-tweet -> https://www.youtube.com/watch?v=Fn6k-7zvo4w
//info from www.50waystohelp.com
var messages = ["Did you know you can save power by taking shorter showers? If you're really ambitious, try to keep it under 5 minutes!",
    "Bringing your own bags to the supermarket can keep plastic out of landfills. Plastic takes at least 450 years to decompose!",
    "Make sure to recycle your newspapers! 44 million are thrown away every day. Even if you recycle only once per week, half a million trees could be saved!",
    "Turning the tap off while brushing your teeth can save up to 5 gallons of water a day!",
    "Use your cruise control, even when you're not on the interstate! This will help improve your gas mileage by at least 15%, which will save the environment, gasoline and your money.",
    "Where possible, buy local produce. This saves all the pollution incurred by transporting goods long distances!",
    "Adjusting the temperature in your home by just one degree can save you 10% on your energy use over the year. This benefits both you and the planet!",
    "Invest in travel mugs or reusable water bottles! This saves on waste and keeps your coffee warmer and your water cooler longer :)",
    "Remember to always recycle glass and aluminum! It's possible to make 20 recycled cans with the same amount of energy it takes to make just one new one, & every ton of glass recycled saves 9 gallons of oil used for fuel to produce new glass.",
    "Choose matches over lighters! 1.5 billion disposable lighters containing plastic and butane end up in landfills every year.",
    "Download your software instead of buying disks! It's often cheaper and it reduces wasted packaging materials.",
    "Use a reusable spoon to stir your coffee! Every year, 138 billion straws and stirrers are thrown away in the USA.",
    "Pay bills online! Not only is it quick and convenient, If every US household received electronic statements, then we could save 18.5 million trees, 2.2 billion tons of greenhouse gases, and 1.7 billion pounds of solid waste per year.",
    "Turning your computer off overnight can help save energy while saving you up to $14 a year!",
    "Did you know that rinsing your dishes before putting them in the dishwasher wastes up to 20 gallons of water per load?",
    "When it's nice out, try using a clothesline to dry your clothes! Along with cutting power usage, your clothes will las longer and smell fresher!",
    'Try switching your washer from "Hot" to "Warm." If everyone in the US did this, it could save ~100,000 barrels of oil a day!',
    "Make an effort to go paperless, or try to be resourceful with your paper usage. American businesses waste 21 million tons of paper a year!",
    "Re-use gift wrap, bows, and tags! You could even be creative and use old newspapers or magazines to make a unique design!",
    "Don't throw away perfectly good things just because you're sick of them. Instead, donate them to a thrift store!"]

var symbols = ["\u{10084}", "\u{09728}", "\u{09733}", "\u{09786}", "\u{10051}", "\u{09835}", "\u{08258}", "\u{09834}", "\u{09883}", "\u{09913}", "\u{09956}", "\u{09790}", "\u{09784}", "\u{09925}", "\u{09928}", "\u{09889}", "\u{10051}", "\u{10032}", "\u{10037}", "\u{10035}"]

//which message to send
let mnum = 100 - messages.length;
var messageLocation = (Math.floor(Math.random() * 100) - mnum);
console.log(messageLocation);
let num = 100 - symbols.length;

//to insert symbols from the array above:
    /*var r = (Math.floor(Math.random() * 100) - num);

        var tweet = {
            status: txt + "\n" + symbols[r]
        }*/

function writeTweet(txt) {
    var r = Math.floor(Math.random() * 100);

    var tweet = {
        status: r + ": " +txt
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
//to set how often it tweets-> desired minutes * 30,000
//150,000 = every 5 minutes 
//75000 = every 2.5 minutes


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

