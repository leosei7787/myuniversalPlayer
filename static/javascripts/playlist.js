/*
 * Dï¿½finition d'une playlist
 */

var playlist = {
	name : "",
	tracklist : [],
	newPlaylist : function(name) {
		playlist.name = name;
	},
	insertTrack_atIndex : function(index, track) {
		playlist.tracklist.splice(index, 0, track);
	},
	deleteTrack_atIndex : function(index) {
		playlist.tracklist.splice(index, 1);
	},
	moveTrack_fromIndex_toIndex : function(fromIndex, toIndex) {
		var tmp = playlist.tracklist[fromIndex];
		playlist.tracklist.splice(fromIndex, 1);
		playlist.tracklist.splice(toIndex, 0, tmp);
	},
	deletePlaylist : function() {
		tracklist.splice(0, playlist.tracklist.length);
	},
	savePlaylist : function() {
		$.get(rootUrl + "Playlist.json", {
			cmd : 'SET',
			name : playlist.name
		}, function(data) {
			console.log(data);
		});
		$.each(playlist.tracklist, function(index, track) {
			$playlistName = playlist.name;

			$.get(rootUrl + "Asso.json", {
				cmd : 'SET',
				playlist : $playlistName,
				track : track.player_code + "-" + track.external_id
			}, function(data) {
				console.log($playlistName);
				console.log(data);
			});
		});
	},
	savePlayerStack : function() {
		if (player.playlist.length > 0) {
			var d = new Date();
			playlist.name = "live_playlist" + d.getFullYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes();
			console.log(playlist.name);
			playlist.tracklist = player.playlist;
			playlist.savePlaylist();
			alert("Enregistrement réussi")

		} else {
			alert("Pas de pistes dans la playlist en cours")
		}
	},
	loadPlaylists : function() {
		$.get(rootUrl + "Playlist.json", {
			cmd : 'GET',
			limit : 'none'
		}, function(data) {
			console.log(data);
		});
	}
}

