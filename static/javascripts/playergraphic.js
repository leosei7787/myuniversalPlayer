var player_graphic = {
	total : 0,
	title : "",
	thumb_url : "",
	url : "",
	set_attributes : function(total, title, thumb_url, url) {
		player_graphic.total = total;
		player_graphic.title = title;
		player_graphic.thumb_url = thumb_url;
		player_graphic.url = url;
	},
	update_graphique : function() {
		//reset infos
		$("#cover_container").empty();
		$('#totalTime').html("-");
		$('#elpasedTime').html("-");
		$('#loadedProgressBar').css("width", "0%");
		$('#partialProgressBar').css("width", "0%");

		//update infos
		$('#song_title').html(player_graphic.title);
		$('#cover_container').append("<img src='" + player_graphic.thumb_url + "' id='cover'/>");

		//update favicon
		if (player.playlist[player.currentIndex].player_code == "YTB") {
			changeFavicon("images/youtube_icon.ico");
		} else if (player.playlist[player.currentIndex].player_code == "DZR") {
			changeFavicon("images/deezer_icon.ico");
		}

	},
	update_total : function() {
		var totalmin = Math.floor(player_graphic.total / 60);
		totalmin = totalmin < 10 ? "0" + totalmin : totalmin;
		var totalsec = Math.floor(player_graphic.total % 60);
		totalsec = totalsec < 10 ? "0" + totalsec : totalsec;
		$('#totalTime').html(totalmin + ":" + totalsec);
	},
	update_time : function(sec) {
		//define reaction on time update
		var totalmin = Math.floor(sec / 60);
		var totalsec = Math.floor(sec % 60);
		var totalmin = totalmin < 10 ? "0" + totalmin : totalmin;
		var totalsec = totalsec < 10 ? "0" + totalsec : totalsec;
		$('#elpasedTime').html(totalmin + ":" + totalsec);
		$('title').html(totalmin + ":" + totalsec);

		var percent = Math.floor(sec / player_graphic.total * 100);
		percent = typeof percent != "number" ? 0 : percent;
		$('#partialProgressBar').css("width", percent + "%");
	},
	update_load : function(percent) {
		//define reaction on load update
		$('#loadedProgressBar').css("width", percent + "%");
	},
	playing : function() {
		//define reaction on playing
		$('#playpause').css("background-image", "url('/images/1340472546_button_black_pause.png')");

	},
	paused : function() {
		//define reaction on paused
		$('#playpause').css("background-image", "url('/images/1340472571_button_black_play.png')");

	},
	loading : function() {
		//define réaction on loading
	},
	display_cursor : function(e) {
		//display and track cursor
		$("#timeCursor").css("display", "block");
		var offset = e.pageX - $("#progress").offset().left;
		$("#timeCursor").css("left", offset + "px");
	},
	set_cursor : function(e) {
		//get position and update player
		var offset = e.pageX - $("#progress").offset().left;
		var percent = Math.floor(offset / $("#progress").innerWidth() * 100);
		player.seek_to_precent(percent);
	},
	hide_cursor : function() {
		//hide cursor
		$("#timeCursor").css("display", "none");
	},
	update_current_track : function(index) {
		$("#playlistTracks .currentTrack").removeClass("currentTrack");
		$("#playlistTracks .playlistTrack:eq(" + index + ")").addClass("currentTrack");
	},
	print_playlist : function() {

		$("#playlistTracks").empty();
		$("#playlistTracks").append("<tbody class=content>");
		$.each(player.playlist, function(index, track) {
			$("#playlistTracks").append("<tr class='playlistTrack' id='searchresult_" + index + "'>" + "<td class='ThumbNailImage'><img width=40 height=40 src='" + track.thumb_url + "' alt='no preview available'></td>" + "<td class='resultTrackTitle'>" + track.title + "</td>" + "<td class='remove' id='remove" + index + "'>Remove</td> </tr>");
		});
		$("#playlistTracks").append("</tbody>");
		$('#playlist .playlistTrack').each(function(index) {
			$(this).dblclick(function() {
				var id = $(this).index();
				console.log("Index to play " + id);
				player.play_video(id);
			})
		});

		$('#playlist .remove').each(function(index) {
			$(this).click(function() {
				player.remove_from_playlist(index);
			});
			$('#playlistTracks tbody.content').sortable({
				revert : true,
				start : function(event, ui) {
					var start_pos = ui.item.index();
					ui.item.data('start_pos', start_pos);
					console.log("startIndex :" + start_pos);
				},
				change : function(event, ui) {
					var start_pos = ui.item.data('start_pos');
					var index = ui.placeholder.index();
					$('#playlistTracks li:eq(' + (index + 1) + ')').css("background-color", "aqua");
					$('#playlistTracks li: not(' + (index + 1) + ')').css("background-color", "transparent");

					console.log("endIndex:" + index);
				},
				stop : function(event, ui) {
					var start_pos = ui.item.data('start_pos');
					var index = ui.item.index();
					player.change_in_playlist(start_pos, index);

					$.each(player.playlist, function(index, track) {
						console.log(track.title);
					});
					console.log("startIndex:" + ui.item.data('start_pos'));
				},
				update : function(event, ui) {
					$('#playlistTracks li').css("background-color", "transparent");
				}
			});
			$('#playlistTracks tbody.content').disableSelection();

		});
		if (player.playlist.length == 1) {
			$("#savePlaylist").click(function(e) {
				playlist.savePlayerStack();
			});
		}
		if(player.state == "PLAY"){
		  player_graphic.update_current_track(player.currentIndex);
		}
		
	}
};
