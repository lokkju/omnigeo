module.exports = [
  'bing',
  'dataScienceToolkit',
  'geocoderCa',
  'google',
  'mapquest',
  'nominatim'
].reduce(function(memo, module) {
  memo[module] = require('./' + module)
  return memo
}, {})
