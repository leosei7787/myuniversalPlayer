"""
Class : Search
This class is the main controler for the Search service.
It will handle all submodule of search and aggregate results.
"""

from DeezerSearch import DeezerSearch
from YoutubeSearch import YoutubeSearch
from copy import deepcopy
import json
import webapp2

# Apps modules.

class SearchV2(webapp2.RequestHandler):
  def get(self):

      query = {
               "q" : self.request.get("query"),
               "order" : self.request.get("order"),
               "format" : self.request.get("format"),
               "limit" : self.request.get("limit"),
               }
      
      totalResults = []
    
      if self.request.get("DZR"):                        
          deezerResults = []  
          deezerSearcher = DeezerSearch(query)
          deezerResults = deepcopy(deezerSearcher.get_results())
          totalResults.extend(deezerResults)
          
      if self.request.get("YTB"):
          youtubeResults = []
          youtubeSearcher = YoutubeSearch(query)
          youtubeResults = deepcopy(youtubeSearcher.get_results())
          totalResults.extend(youtubeResults)

      self.response.headers['Content-Type'] = 'application/json'
      self.response.headers['Access-Control-Allow-Origin'] = '*'
      self.response.out.write(json.dumps(totalResults))
