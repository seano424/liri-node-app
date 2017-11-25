	var fs = require("fs");
	var key = require("./keys.js");
	var Spotify = require('node-spotify-api');
	var Twitter = require("twitter");
	var omdb = require("request");
	var request = require("request");
	var functions = process.argv[2];
	var value = process.argv[3];
	var params = {
		screen_name: 'JoelEmbiid', 
		count: 20
		};

	//Need to figure out how to put this on another page 
	
	//Need to figure out how to put this on another page...
	var client = new Twitter (key.twitterKeys);

		function tweets(){
			console.log('entering tweets()')
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  		if (!error) {
			  		for(var i = 0; i < tweets.length; i++){
			    	console.log(tweets[i].text);
			  		}	
		  		} else{
		  			console.log(error);
		  		}
			});
		}


var spotifySong = function(song){
	var spotify = new Spotify({
	  id: '339b49e3497747219168dcb49bdb2637',	
	  secret: '0eb3a7b9c15844338601ec654e333715'
	});

	spotify.search({ type: 'track', query: song}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
	
		// console.log(data.tracks.items);

		data.tracks.items.forEach(function(value){
			console.log("Artist Name: " + value.artists[0].name);
			console.log("Song Name: " + value.name);
			console.log("Preview Link: " + value.preview_url);
			console.log("Alumb Name: " + value.album.name);

			console.log("---------------------------------------------------");
			console.log("");

		})

	});
}


//function handles the spotify song request
var spotifyMusic = function(){
	var songChoice = process.argv[3];

	spotifySong(songChoice);
}

var movie = function(){
	var movieChoice = process.argv[3];
	// console.log(movieChoice)
	var movieChoiceArray = movieChoice.split(" ");
	var movie = movieChoiceArray.join("+");
	// console.log(movie)
	var APIrequest = "http://www.omdbapi.com/?apikey=eb04ce92&t=" + movie;

	request(APIrequest, function(error, response, body){
		if (!error && response.statusCode === 200) {

		    // Parse the body of the site and recover just the imdbRating
		    console.log("Movie Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
		    console.log("Rotten Tomaties Rating: " + JSON.parse(body).Ratings[0].Value);
		    console.log("Country where movie was produced: " + JSON.parse(body).Country);
		    console.log("Movie language: " + JSON.parse(body).Language);
		    console.log("Movie plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		    console.log("");
		  }

	})
}

	switch (functions) {
		case 'my-tweets':
		tweets();
		break;
		case 'spotify-this-song':
		spotifyMusic();
		break;
		case 'movie-this':
		movie();
		break;
		case 'do-what-it-says':
		fs();
		break;
	}
	 

	// Another attempt at this function..
	// function spotifymusic(){ 	
	// spotify
	//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
	//   .then(function(data) {
	//     console.log(data); 
	//   })
	//   .catch(function(err) {
	//     console.error('Error occurred: ' + err); 
	//   });
	//  }











