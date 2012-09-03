/*
 * Gestion du player Youtube
 */


var playerYoutube = {
  player : {},
  state_mapping : {
    "0" : "END",
    "1" : "PLAY",
    "2" : "PAUSED",
    "3" : "LOADING"
  },
  init : function() {
    swfobject.embedSWF("http://www.youtube.com/v/8UVNT4wvIGY?enablejsapi=1&playerapiid=ytplayer&version=3", "player_youtube", "300", "300", "8", null, null, {
      allowScriptAccess : "always"
    }, {
      id : "player_youtube"
    });
  },
  play_video_url : function(url) {
    playerYoutube.player.loadVideoByUrl(url);
    playerYoutube.player.playVideo();
  },
  on_state_change : function(newState) {
    player.on_state_change(playerYoutube.state_mapping[newState]);
  }
};

function onYouTubePlayerReady(playerId) {
  playerYoutube.player = document.getElementById("player_youtube");
  playerYoutube.player.addEventListener("onStateChange", "playerYoutube.on_state_change");
}