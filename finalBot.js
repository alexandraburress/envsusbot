var twit = require('twit');
var config = require("./config.js");
var Twitter = new twit(config);


let tweetCount = 0;
let Fargo = ['-96.901280', '46.976013', '-96.746381', '46.728686'];

console.log("Bot is running");

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


//which message to send
let mnum = 100 - messages.length;
var messageLocation = 0;//(Math.floor(Math.random() * 100) - mnum);


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
    /*go through messages-- if at end, reset
    if (messageLocation < messages.length) {
        messageLocation += 1;
    }
    else {
        messageLocation = 0;
    } */
}

let autoTweet = function () {
    writeTweet("In the last 6 hours, there have been " + tweetCount + " tweets about sustainability in the Fargo area!");
}


setInterval(autoTweet, 21600000);
//to set how often it tweets-> desired minutes * 30,000
//300,000 = every 5 minutes 
//150000 = every 2.5 minutes
//86400000 = one day
//1800000 = half hour


var stream = Twitter.stream('statuses/filter', { track: 'sustainability Fargo', language: 'en' });
stream.on('tweet', tweetEvent);


function tweetEvent(eventMsg) {
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    
    
        tweetCount += 1;
        console.log(from + " tweeted about sustainability from inside Fargo! Today, we are at " + tweetCount + " tweets!");
        var newtweet = '@' + from + ' thanks for taking part in the conversation about sustainabilty in our community!';
        writeTweet(newtweet);

    
    
}

