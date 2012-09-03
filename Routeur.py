"""
Class : Routeur
This is the main routeur to distribute 
requests to the associated service
"""
from PlaylistModules.Playlist import AssoPlaylistTrackOperation, PlaylistOperation, TrackOperation
from SearchModules.Search import Search
from SearchModules.SearchV2 import SearchV2
import os
import webapp2
    

# Apps modules.


class MainRouteur(webapp2.RequestHandler):
    def get(self): 
        self.response.headers['Content-Type'] = 'text/html'
        self.response.out.write(open('static/Index.html', 'r').read())

app = webapp2.WSGIApplication([('/', MainRouteur), ('/Index.html', MainRouteur),
                               ('/Search.json', Search), ('/SearchV2.json', SearchV2),
                               ('/Playlist.json', PlaylistOperation),
                               ('/Track.json', TrackOperation),
                               ('/Asso.json', AssoPlaylistTrackOperation)],
                              debug=True)

