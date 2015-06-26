var url = require('url')

function MapQuestAdapter() {}

MapQuestAdapter.prototype.buildUrl = function(address) {
  return url.format({
    protocol: 'http:',
    hostname: 'open.mapquestapi.com',
    pathname: '/geocoding/v1/address',
    query: { location: address }
  })
}

MapQuestAdapter.prototype.parseResponse = function(response) {
  var json = JSON.parse(response);
  if(json.info.messages) {
    return {error: json.messages};
  }
  var coords = JSON.parse(response).results[0].locations[0].latLng
  return coords
}

module.exports = MapQuestAdapter
