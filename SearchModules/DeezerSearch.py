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

class DeezerSearch(ModelSearch):
    
    def __init__(self, query):
        self.query = query
        self.url = "http://api.deezer.com/2.0/search?"
        self.map_attributes = {
                      "q":"q",
                      "order":"order",
                      "format":"output",
                      "limit":"nb_items"
                      }
        self.map_values = {
                  "date":"RANKING",
                  "rating":"RATING_DESC",
                  "relevance":"RANKING"
                  }
        self.output_url = ""
        self.dataOut = []


    # Retrieve results of a query object and return it
    def get_results(self):
        url = self.create_request(self.query)
        results = urllib2.urlopen(url)
        return(self.mapping(results))
    
    # Transforms the Json from Deezer to our own format
    def mapping(self, data):
        dataIn = json.load(data)
        
        for track in dataIn['data']:
            trackResult = TrackResult(track['id'], track['title'], track['link'], track['album']['cover'], 'DZR')
            self.dataOut.append(trackResult.params)
        
        return self.dataOut
    

        

            
