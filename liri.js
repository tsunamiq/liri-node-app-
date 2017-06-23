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


switch(input){
	case "my-tweets" : 
		myTweets();
		break;
	case "spotify-this-song":
		searchSpotify(userSearch);
		break;
	case "movie-this":
		searchMovie(userSearch);

}

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
			}	
	  	}else{
	  		console.log("ERROR LOADING TWITTER!")
	  	}
	});
}

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
	  	}
	});
}

function searchMovie(search){
	var request = require('request');
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+search, function (error, response, body) {
		var movie = JSON.parse(body);  
	  	
		if(error){
	  		console.log('error:', error); // Print the error if one occurred 
	  		//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	}
	  	if(movie.Title == null){
	  		console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" );
	  		console.log("It's on Netflix!")
	  	}else{
	  	 

		console.log("Title of the Movie: " + movie.Title )
		console.log("Year the movie came out: " + movie.Year)
		console.log("IMDB Rating of the movie: " + movie.imdbRating)
		console.log("Country where the movie was produced: " + movie.Country)
		console.log("Language of the Movie: " + movie.Language)
		console.log("Plot of the movie: " + movie.Plot)
		console.log("Actors in the movie: " + movie.Actors)
		console.log("Rotten Tomatoes URL" + movie.Website)
	}
	});

}




})()

