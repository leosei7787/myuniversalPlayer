"""
Class : Routeur
This is the main routeur to distribute 
requests to the associated service
"""
from PlaylistModules.Playlist import AssoPlaylistTrackOperation, PlaylistOperation, TrackOperation
from SearchModules.Search import Search
from SearchModules.SearchV2 import SearchV2
from WebClient.WebClient import WebClient
import os
import webapp2

app = webapp2.WSGIApplication([('/', WebClient), ('/Index.html', WebClient),
                               ('/Search.json', Search), ('/SearchV2.json', SearchV2),
                               ('/Playlist.json', PlaylistOperation),
                               ('/Track.json', TrackOperation),
                               ('/Asso.json', AssoPlaylistTrackOperation)],
                              debug=True)

