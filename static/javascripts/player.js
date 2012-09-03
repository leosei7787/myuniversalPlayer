/*
 * Main players
 */

var player = {
	state : "LOADING",
	playlist : [],
	currentIndex : 0,
	totalSecond : 0,
	elaspedSecond : 0,
	timeInterval : 0,
	loadInterval : 0,
	init : function() {
		playerYoutube.init();
		playerDeezer.init();
	},

	/// PLAYER MANAGEMENT///

	play_video : function(index) {
		if(player.playlist.length > 0){
			if (player.playlist[player.currentIndex].player_code == "YTB") {
				playerYoutube.player.stopVideo();
			} else if (player.playlist[player.currentIndex].player_code == "DZR") {
				playerDeezer.player.player.pause();
			}
		}
		
		var track = player.playlist[index];
		player.currentIndex = index;
		var total = 0;
		if (track.player_code == "YTB") {
			playerYoutube.play_video_url(track.url);
			total = playerYoutube.player.getDuration();
		} else if (track.player_code == "DZR") {
			playerDeezer.play_music_by_id(track.external_id);
		}
		player_graphic.set_attributes(total, track.title, track.thumb_url, track.url);
		player_graphic.update_graphique();
    player_graphic.update_current_track(player.currentIndex);
		//start checking loading percent.
		player.start_checking_load();
	},
	stop : function() {
		player.stop_checking_load();
	},
	pause : function() {
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			playerYoutube.player.pauseVideo();
		} else if (player.playlist[player.currentIndex].player_code == "DZR") {
			playerDeezer.player.player.pause();
		}
	},
	resume : function() {
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			playerYoutube.player.playVideo();
		} else if (player.playlist[player.currentIndex].player_code == "DZR") {
			playerDeezer.player.player.play();
		}
	},
	next : function() {
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			playerYoutube.player.stopVideo();
		} else if (player.playlist[player.currentIndex].player_code == "DZR") {
			playerDeezer.player.player.pause();
		}
		player.currentIndex = (player.currentIndex + 1) % player.playlist.length;
		player.play_video(player.currentIndex);
		player_graphic.update_current_track(player.currentIndex);
	},
	previous : function() {
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			playerYoutube.player.stopVideo();
		} else if (player.playlist[player.currentIndex].player_code == "DZR") {
			playerDeezer.player.player.pause();
		}
		player.currentIndex--;
		if (player.currentIndex < 0) {
			player.currentIndex = player.playlist.length - 1;
		}
		player.play_video(player.currentIndex);
		player_graphic.update_current_track(player.currentIndex);
	},

	///PROGRESS BAR AND TIME MANAGEMENT

	on_state_change : function(state) {
		player.state = state;
		if (state == "PLAY") {
			player.start_checking_time();
			player_graphic.playing();
		} else if (state == "PAUSED") {
			player.stop_checking_time();
			player_graphic.paused();
		} else if (state == "LOADING") {
			player.stop_checking_time();
			player_graphic.loading();
		} else if (state == "END") {
			player.next();
		}
	},
	start_checking_time : function() {
		player.timeInterval = setInterval("player.check_time()", 500);
		console.log("calling check time");
	},
	stop_checking_time : function() {
		clearInterval(player.timeInterval);
	},
	check_time : function() {
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			player.elapsedSecond = playerYoutube.player.getCurrentTime();
			player.totalSecond = playerYoutube.player.getDuration();
		}
		if (player.playlist[player.currentIndex].player_code == "DZR") {
			player.elapsedSecond = playerDeezer.getCurrentTime();
			player.totalSecond = playerDeezer.getDuration();
		}
		player_graphic.update_time(player.elapsedSecond);
		player_graphic.total = player.totalSecond;
		player_graphic.update_total();
	},
	start_checking_load : function() {
		player.loadInterval = setInterval("player.check_load()", 500);
	},
	stop_checking_load : function() {
		clearInterval(player.loadInterval);
	},
	check_load : function() {
		var percent = 0;
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			percent = Math.floor((playerYoutube.player.getVideoBytesLoaded() / playerYoutube.player.getVideoBytesTotal() ) * 100);
		}
		player_graphic.update_load(percent);
	},
	seek_to_precent : function(percent) {
		var sec = percent / 100 * player.totalSecond;
		if (player.playlist[(player.currentIndex)].player_code == "YTB") {
			playerYoutube.player.seekTo(sec, true);
		}
	},
	///PLAYLIST MANAGEMENT///

	add_to_playlist : function(track) {
		player.playlist.push(track);
		player_graphic.print_playlist();
		return player.playlist.length - 1;
	},
	remove_from_playlist : function(index) {
    if (index < player.currentIndex) {
      player.playlist.splice(index, 1);
      player.currentIndex --;
    }		
		else if (index > player.currentIndex) {
			player.playlist.splice(index, 1);
		}
		else if(index == player.currentIndex){
		  if(player.playlist.length > 1){
        player.next();
        player.pause();
        player.remove_from_playlist(index);   		    
		  }
		  else{
		    player.pause();
        player.remove_from_playlist(index); 
		    alert("EMPTY LIST");
		  }
  
		}
		player_graphic.print_playlist();
		console.log(player.playlist);
	},
	change_in_playlist : function(fromIndex, toIndex) {
		//console.log("CI before :" + player.currentIndex);
		//robustness
		if (fromIndex == toIndex) {
			return;
		}

		//store track to modify
		var tmp = player.playlist[fromIndex];
		// Remove it from original place
		player.playlist.splice(fromIndex, 1);
		//insert tmp back into array
		player.playlist.splice(toIndex, 0, tmp);

		/* DEAL WITH player.currentIndex */

		//case currentIndex in between to and from
		if (toIndex <= player.currentIndex && player.currentIndex < fromIndex) {
			player.currentIndex++;
		}
		//case currentIndex in between to and from
		else if (fromIndex < player.currentIndex && player.currentIndex <= toIndex) {
			player.currentIndex--;
		} else if (player.currentIndex == fromIndex) {
			player.currentIndex = toIndex;
		}

		//console.log("CI after" + player.currentIndex);
	},

}; 