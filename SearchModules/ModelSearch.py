"""
Class : ModelSearch
This class is an Interface for all the subsearch module
"""
import urllib

class ModelSearch:

    
    # Instantiate the model and store the query.
    def __init__(self,query):
        self.query = query
        # Dictionnary to translate query and value to specific attributes of service
        self.map_attributes = {}
        self.map_values = {}
        self.url = ''
        self.output_url = ''
        self.dataOut = []       

    # Get the results from the third-party service
    def get_results(self):
        raise NotImplementedError( "Should have implemented get_results" )
    
    # Encode query object into url request to youtube api
    def create_request(self,query):
        url_object = {}
        
        for attribute in query:
            value =  query[attribute] in self.map_values and self.map_values[ query[attribute] ] or query[ attribute ] 
            url_object[ self.map_attributes[attribute] ] = value
        self.output_url = self.url+urllib.urlencode(url_object)
        return self.output_url
    
    # Maps the Json into our JSon
    def mapping(self,data):
        raise NotImplementedError( "Should have implemented mapping" )

    
class TrackResult:

    
    def __init__(self,external_id, title, url, thumb_url,player_code):
        self.params = {}
        self.params["external_id"] = external_id
        self.params["title"] = title
        self.params["url"] = url
        self.params["thumb_url"] = thumb_url
        self.params["player_code"] = player_code
    
        
    
    