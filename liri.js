"use strict";
(function(){

var keys = require("./key.js");
var consumerKey = keys.twitterKeys.consumer_key;
var consumerSecret = keys.twitterKeys.consumer_secret;
var accessTokenKey = keys.twitterKeys.access_token_key;
var accessTokenSecret = keys.twitterKeys.access_token_secret;

var nodeArgs = process.argv;
var userSearch =  ""
var input = process.argv[2];

for (var i = 3; i < nodeArgs.length; i++) {

  // Build a string with the address.
  userSearch = userSearch + " " + nodeArgs[i];
}

commands(input);

//=================================================================
// switch case takes input commmand prompt and call functions
//=================================================================

function commands(input){
	switch(input){
		case "my-tweets" : 
			myTweets();
			break;
		case "spotify-this-song":
			searchSpotify(userSearch);
			break;
		case "movie-this":
			searchMovie(userSearch);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
	}
}

//=================================================================
// My tweets function
//=================================================================

function myTweets(){
	var Twitter = require('twitter');
	 
	var client = new Twitter({
		consumer_key: consumerKey,
		consumer_secret: consumerSecret,
		access_token_key: accessTokenKey,
		access_token_secret: accessTokenSecret
	});
	 
	var params = {screen_name: 'whileiwasyoung'};
	client.get('statuses/user_timeline.json?&count=20', params, function(error, tweets, response) {
		if (!error) {
	  		for(var i = 0 ; i< 20 ; i++){
		    	console.log("My Tweet" + tweets[i].text);
		    	console.log("Date: " +  tweets[i].created_at)
		    	log("My Tweet" + tweets[i].text);
		    	log("Date: " +  tweets[i].created_at)
			}	
	  	}else{
	  		console.log("ERROR LOADING TWITTER!")
	  		log("ERROR LOADING TWITTER!")
	  	}
	});
}

//=================================================================
// Spotify search function
//=================================================================

function searchSpotify(search){
	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify({
		id: 'da97b33e9f4640e08420c513eed1b7e2',
		secret: '7fc8dcaebc8a40cb9f47b20f9f9f2e43'
	});
	 
	spotify.search({ type: 'track', query: search }, function(err, data) {
		if (err) {
	    	return searchSpotify("The Sign Ace");
		}else{ 
			console.log("Band Name: " + data.tracks.items[0].artists[0].name); 
			console.log("Song Name: "+ data.tracks.items[0].name);
			console.log("Album Name: " + data.tracks.items[0].album.name);
			console.log("Spotify Link: " + data.tracks.href);
			log("Band Name: " + data.tracks.items[0].artists[0].name);
			log("Song Name: "+ data.tracks.items[0].name);
			log("Album Name: " + data.tracks.items[0].album.name);
			log("Spotify Link: " + data.tracks.href);
	  	}
	});
}

//=================================================================
// Movie search function
//=================================================================

function searchMovie(search){
	var request = require('request');
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+search, function (error, response, body) {
		var movie = JSON.parse(body);  
	  	
		if(error){
	  		console.log('error:', error); 
	  		log('error:', error);
	  	}
	  	if(movie.Title == null){
	  		console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" );
	  		console.log("It's on Netflix!")
	  		log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" );
	  		log("It's on Netflix!");
	  	}else{
			console.log("Title of the Movie: " + movie.Title )
			console.log("Year the movie came out: " + movie.Year)
			console.log("IMDB Rating of the movie: " + movie.imdbRating)
			console.log("Country where the movie was produced: " + movie.Country)
			console.log("Language of the Movie: " + movie.Language)
			console.log("Plot of the movie: " + movie.Plot)
			console.log("Actors in the movie: " + movie.Actors)
			console.log("Rotten Tomatoes URL" + movie.Website)

			log("Title of the Movie: " + movie.Title )
			log("Year the movie came out: " + movie.Year)
			log("IMDB Rating of the movie: " + movie.imdbRating)
			log("Country where the movie was produced: " + movie.Country)
			log("Language of the Movie: " + movie.Language)
			log("Plot of the movie: " + movie.Plot)
			log("Actors in the movie: " + movie.Actors)
			log("Rotten Tomatoes URL" + movie.Website)
		}
	});
}

//=================================================================
//  Do what it says function
//=================================================================

function doWhatItSays(){
	var fs = require('fs')
	fs.readFile('random.txt', 'utf8', function (err,data) {
	  	if (err) {
	    	return 
	    		console.log(err);
	    		log(err);
	  	}
	  	console.log(data);
	  	log(data);
	 	var stringArray = data.split(',');
	 	console.log("string array: " + stringArray);
	 	log("string array: " + stringArray)
	 	userSearch = stringArray[1];
	 	commands(stringArray[0]);
    });
}

//=================================================================
// Log Function
//=================================================================

function log(printToLog){
	var fs = require('fs');

	fs.appendFile('log.txt', printToLog+ "\n", function (err) {
	 	if (err) throw err;
	 
	});
}

})()

