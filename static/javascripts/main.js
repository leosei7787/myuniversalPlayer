/*
* Mapping event to elements
*/

var rootUrl = "http://myuniversalplayer.appspot.com/";
//var rootUrl = "http://localhost:8083/";
var access_variable;

$(document).ready(function() {

	$('#searchButton').click(function() {
		console.log($("#searchQuery").attr("value"));
		Search.get_results($("#searchQuery").attr("value"), Search.display_results);
	});

	player.init();

	$('#searchQuery').focus(function() {
		$("#searchQuery").attr("value", '');
	});

	$('#searchQuery').keypress(function(event) {
		if (event.which == 13) {
			Search.get_results($("#searchQuery").attr("value"), Search.display_results);
			$("#searchQuery").blur();
		}
	});

	$('#playpause').click(function() {
		if (player.state == "PLAY") {
			player.pause();
		} else if (player.state == "PAUSED") {
			player.resume();
		}
	});
	
	$('#previous').click(function() {
		player.previous();
	});

	$('#next').click(function() {
		player.next();
	});

  $("#progress, #loadedProgressBar, #partialProgressBar").mouseover(function(e){
    player_graphic.display_cursor(e);
  });
  
  $("#progress, #loadedProgressBar, #partialProgressBar").click(function(e){
    player_graphic.set_cursor(e);
  });

  $("#progress, #loadedProgressBar, #partialProgressBar").mouseout(function(){
    player_graphic.hide_cursor();
  });

/*	$("#searchResults .resultTrack").each(function(index) {
			var id = $(this).attr("id").split("_")[1];*/

  $("head").append("<link id='dynamic_favicon' rel='shortcut-icon' href='"+rootUrl+"images/youtube_icon.ico'> </link>");

});

function changeFavicon(src) {
  $("#dynamic_favicon").remove();
  $("head").append("<link id='dynamic_favicon' rel='shortcut-icon' href='"+rootUrl+src+"'> </link>");

}
