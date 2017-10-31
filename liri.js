// var fs = require('fs');
// var twitter = require('twitter');
// var spotify = require('spotify');
// var omdb = require('omdb');
// var request = require('request');
// var input1 = process.argv[2];
// var input2 = process.argv.splice(3).join(" ");
//
// function moot() {
//
//   fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {
//
//     // If an error was experienced we say it.
//     if (err) {
//       console.log(err);
//     }
//
//     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//       // console.log("Content Added!");
//     }
//
//   });
// }
// var keys = require('./keys.js');
// // console.log(keys.twitterKeys);
//
// var client = new Twitter(keys.twitterKeys);
//
// var params = {
//   screen_name: 'AnishTendolkar',
//   count: 20
// };
// run();
//
// function run() {
//   if (input1 == "my-tweets") {
//     client.get('statuses/user_timeline', params, function(error, tweets, response) {
//       if (!error) {
//         console.log("My Last 20 tweets");
//         tweets.forEach(function(individualTweet) {
//           console.log("Time Posted: " + individualTweet.created_at);
//           console.log("Tweet:" + individualTweet.text);
//         });
//       } else {
//         console.log("error");
//       } log();
//       else if (input1 === "spotify-this-song") {
//         if (input2.length < 1) {
//
//           input2 = "I Want it That Way";
//         }
//
//         spotify.search({
//             type: 'track',
//             query: input2
//           }), function(err, data) {
//             if (err) {
//               console.log('Error occurred: ' + err);
//               return;
//             }
//
//         }
//
//     });
//
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

function log() {

    fs.appendFile('./log.txt', input1 + " " + input2 + ", ", function(err) {


        if (err) {
            console.log(err);
        }



    });
}

var keys = require('./keys.js');

var client = new Twitter(keys.twitterKeys);

var params = {
    screen_name: 'AnishTendolkar',
    count: 20
};
var spot = new spotify({
    id: "e1ed6b59ef644660b894b1e78a817d2d",
    secret: "e2e475994eb543cf9a58f732a4bd5db5"
});

run();
//spotify function id and secret needed. var New Spotify!
function run() {

    if (input1 === "my-tweets") {

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                // console.log('');
                console.log('My Last 20 Tweets: ');
                tweets.forEach(function(individualTweet) {
                    console.log('Time Posted: ' + individualTweet.created_at);
                    console.log('Tweet: ' + individualTweet.text);


                });

            } else {
                console.log(error);
            }
        });

        log();

    } else if (input1 === "spotify-this-song") {

        if (input2.length < 1) {

            input2 = "I Want it That Way";
        }

        spot.search({ type: 'track', query: input2 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }
            console.log('Spotify Song Information Results: ');
            console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
            console.log("Track Title: " + data.tracks.items[0].name);
            console.log("Link to Song: " + data.tracks.items[0].preview_url);
            console.log("Album Title: " + data.tracks.items[0].album.name);
        });

        log();

    } else if (input1 === "movie-this") {
      console.log("movie-this else if triggered");
        if (input2.length < 1) {

            input2 = "Mr. Nobody";
        }

        request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece", function(error, response, body) {
          //  console.log("input2: " + input2);
            if (!error && response.statusCode === 200) {
                console.log("line 156 if statement triggered");
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Year of Release: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Countries produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Movie Plot: " + JSON.parse(body).Plot);
                console.log("Actor(s): " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
            } else {
                //console.log("line 167 else statement triggered");
                console.log(error);
                // console.log("Movie Title: " + JSON.parse(body).Title);
                // console.log("Year of Release: " + JSON.parse(body).Year);
                // console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                // console.log("Countries produced in: " + JSON.parse(body).Country);
                // console.log("Language: " + JSON.parse(body).Language);
                // console.log("Movie Plot: " + JSON.parse(body).Plot);
                // console.log("Actor(s): " + JSON.parse(body).Actors);
                // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                // console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);

            }

        });

        log();

    } else if (input1 === "do-what-it-says") {

        log();

        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;
            // console.log(data);

            var arr = data.split(',');

            input1 = arr[0].trim();
            input2 = arr[1].trim();
            run();

        });

    }
}
