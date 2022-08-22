import requests

URL = "http://maps.googleapis.com/maps/api/geocode/json"

myobj = {'somekey': 'somevalue'}

x = requests.post(url, json = myobj)