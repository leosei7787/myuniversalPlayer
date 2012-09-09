var globalData = []

var Search = {
	get_results : function(query, cb) {
		$.getJSON(rootUrl + "SearchV2.json", {
			query : query,
			order : "relevance",
			limit : 10,
			format : "json",
			YTB:0,
			DZR:1
		}, cb);

	},
	display_results : function(data) {
		console.log("coucou");
		globalData = data;
		$("#searchResults").empty();
		$("#searchResults").append("<tbody>");
		$.each(data, function(index, track) {
			$("#searchResults").append("<tr class='resultTrack' id='searchresult_" + index + "'>" + "<td class='ThumbNailImage'><img width=40 height=40 src='" + track.thumb_url + "' alt='no preview available'></td>" + "<td class='resultTrackTitle'>" + track.title + "</td>" + "</tr>");
		});
		$("#searchResults").append("</tbody>");
		$("#searchResults .resultTrack").each(function(index) {
			var id = $(this).attr("id").split("_")[1];

			/*$(this).dblclick(function() {
				var index = player.add_to_playlist(data[id]);
				player.play_video(index);
			});*/
			$(this).click(function() {
				var index = player.add_to_playlist(data[id]);
			});
		});
	}
}
