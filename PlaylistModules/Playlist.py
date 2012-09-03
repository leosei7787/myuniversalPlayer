"""
Class : Playlist
This is the playlist service that will be used to store playlists
"""

from google.appengine.ext import db
import json
import webapp2

class Track(db.Model):
  internal_id = db.StringProperty(required=True)
  title = db.StringProperty(required=True)
  url = db.StringProperty(required=True)
  external_id = db.StringProperty(required=True)
  thumb_url = db.StringProperty()
  player_code = db.StringProperty(required=True, choices=set(["DZR", "YTB"]))
  
  def toDict(self):
   return {'title':self.title, 'url':self.url, 'external_id':self.external_id, 'thumb_url':self.thumb_url, 'player_code':self.player_code}
  
#def guestbook_key(guestbook_name=None):
#  """Constructs a Datastore key for a Guestbook entity with guestbook_name."""
#  return db.Key.from_path('Guestbook', guestbook_name or 'default_guestbook')

class TrackOperation(webapp2.RequestHandler):
    def get(self):
        cmd = self.request.get("cmd")
        if cmd == 'SET':
            track = Track(
                  internal_id=self.request.get("player_code") + "-" + self.request.get("external_id"),
                  title=self.request.get("title"),
                  url=self.request.get("url"),
                  external_id=self.request.get("external_id"),
                  thumb_url=self.request.get('thumb_url'),
                  player_code=self.request.get('player_code')
                  )
            track.put()
            self.response.headers["Content-Type"] = "text/html"
            self.response.out.write("200 OK : internalId=" + track.internal_id)
        elif cmd == 'GET':
            track = db.GqlQuery("SELECT * FROM Track WHERE internal_id = :1 LIMIT 0,1", self.request.get("internal_id"))[0] 
            
            self.response.headers["Content-Type"] = "application/json"
            self.response.out.write(json.dumps(track.toDict()))
        
        
class Playlist(db.Model):
  name = db.StringProperty(required=True)
  
  def toDict(self):
      return {'name':self.name}
      
class PlaylistOperation(webapp2.RequestHandler):
    def get(self):
        cmd = self.request.get("cmd")
        if cmd == 'SET':
            playlist = Playlist(name=self.request.get("name"))
            playlist.put()
            self.response.headers["Content-Type"] = "text/html"
            self.response.out.write("200 OK : playlist=" + playlist.name)           
        elif cmd == 'GET':
            playlist = db.GqlQuery("SELECT * FROM Playlist WHERE name = :1 LIMIT 0,1", self.request.get("name"))[0] 
            self.response.headers["Content-Type"] = "application/json"
            self.response.out.write(json.dumps(playlist.toDict()))
        
class AssoPlaylistTrack(db.Model):
    playlist = db.StringProperty(required=True)
    track = db.StringProperty(required=True)
    
    def toDict(self):
        return {'playlist':self.playlist, 'track':self.track}
    
class AssoPlaylistTrackOperation(webapp2.RequestHandler):
    def get(self):
        cmd = self.request.get("cmd")
        if cmd == 'SET':
            pass
            asso = AssoPlaylistTrack(playlist=self.request.get("playlist"), track=self.request.get("track"))
            asso.put()
            self.response.headers["Content-Type"] = "text/html"
            self.response.out.write("200 OK : track=" + asso.track + " playlist=" + asso.playlist) 
        elif cmd == 'GET':
            asso = db.GqlQuery("SELECT * FROM AssoPlaylistTrack WHERE playlist = :1 AND track = :2 LIMIT 0,1", self.request.get("playlist"), self.request.get("track"))[0] 
            self.response.headers["Content-Type"] = "application/json"
            self.response.out.write(json.dumps(asso.toDict()))            
