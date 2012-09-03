/*
 * Gestion du player Deezer
 */

var playerDeezer = {
	player : {},
	currentTime : 0,
	totalTime : 0,
	state_mapping : {
		"0" : "END",
		"1" : "PLAY",
		"2" : "PAUSED",
		"3" : "LOADING"
	},
	init : function() {
		DZ.init({
			appId : 'myuniversalplayer',
			channelUrl : rootUrl + 'Index.html',
			player : {
				//container : 'DZ-player',
				cover : true,
				playlist : true,
				width : 600,
				height : 300,
				format : 'vertical',
				onload : deezerPlayerReady
			}
		});

		playerDeezer.player = DZ;
	},
	/*play_video_url : function(url) {
	 playerYoutube.player.loadVideoByUrl(url);
	 playerYoutube.player.playVideo();
	 },
	 on_state_change : function(newState) {
	 player.on_state_change(playerYoutube.state_mapping[newState]);
	 }*/

	play_music_by_id : function(id) {
		playerDeezer.player.player.playTracks([id]);
	},
	getCurrentTime : function() {
		return playerDeezer.currentTime;
	},
	getDuration : function() {
		return playerDeezer.totalTime;
	}
};

function deezerPlayerReady() {
	playerDeezer.player.Event.suscribe('player_play', function(event) {
		player.on_state_change("PLAY");
	});
	playerDeezer.player.Event.suscribe('player_paused', function(event) {
		player.on_state_change("PAUSED");
	});
	playerDeezer.player.Event.suscribe('current_track', function(track_info,event) {
		playerDeezer.totalTime = parseInt(track_info.track.duration);
	});

	playerDeezer.player.Event.suscribe('player_position', function(currentTime, event) {
		playerDeezer.currentTime = Math.floor(parseInt(currentTime));
	});


}
