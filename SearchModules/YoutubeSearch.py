"""
Class : YoutubeSearch
Interface : ModelSearch
This class will implement the request of search to Youtube
"""
import urllib2
import json

# Apps modules.
from ModelSearch import ModelSearch
from ModelSearch import TrackResult

class YoutubeSearch(ModelSearch):
    
    def __init__(self,query):
        self.query = query
        self.url = "https://gdata.youtube.com/feeds/api/videos?v=2&"
        self.map_attributes = {
                      "q":"q",
                      "order":"orderby",
                      "format":"alt",
                      "limit":"max-results"
                      }
        self.map_values = {
                  "date":"published",
                  "rating":"ranking",
                  "relevance":"relevance"
                  }
        self.output_url = ""
        self.dataOut = []
        
    
    # Retrieve results of a query object and return it
    def get_results(self):
        url = self.create_request(self.query)
        results = urllib2.urlopen(url)
        return(self.mapping(results))
        
    # Transforms the Json from Deezer to our own format
    def mapping(self,data):
        dataIn = json.load(data)
        for track in dataIn['feed']['entry']:
            trackResult = TrackResult(track['id']['$t'],track['title']['$t'],track['media$group']['media$content'][0]['url'], track["media$group"]["media$thumbnail"][0]['url'],'YTB')
            self.dataOut.append(trackResult.params)
        
        return self.dataOut
    
    
    
    
    
    
    
    