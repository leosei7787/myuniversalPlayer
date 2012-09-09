"""
Class : WebClient
This class will load webclient configuration file,
And output the associated index document
"""

from copy import deepcopy
import os
import json
import webapp2

# WebClient Module
class WebClient(webapp2.RequestHandler):
    def get(self): 
        self.response.headers['Content-Type'] = 'text/html'
        # Read Configuration File
        JsonConfiguration = open('WebClient/Configuration.json', 'r').read()
        Configuration = json.loads(JsonConfiguration)
        
        # TODO : Get module configuration files
        
        # combine HTML file
        Index = "<!DOCTYPE HTML><html><head>"
        # Title
        Index += "<title>"+Configuration["Title"]+"</title>"
        # Ressources
        
        
        # Html modules
        Index += "</head><body>"
        
        Index += "</body></html>"
        # Output HTML Index
        self.response.out.write(open("Ressources/Index.html","r").read())