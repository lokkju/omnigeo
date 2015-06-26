var async = require('async')
var omnigeo = require('..')

var fs  = require("fs");
var _ = require("lodash");

var TEST_FILE = "test/data/gislabtr.txt";

var results = {};

fs.readFile(TEST_FILE, function(err, f){
    if(err) {console.log(err); return;}
    var lines = f.toString().split('\n');
    var addresses = _.filter(lines, function(l) {return (l.slice(0, 1) != '#' && l.length != 0)});
    _.each(omnigeo.adapters, function(serviceAdapter, service) {
      async.eachSeries(addresses, function(address, callback) {
        omnigeo({service: service}).geocode(address, function(err,res) {
          if(!results.hasOwnProperty(address)) { results[address] = {};}
          if(err) {
            results[address][service] = null;
            callback(err);
          } else {
            results[address][service] = res;
            callback();
          }
        });
      }, function(err){
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('An address failed to process');
        } else {
          console.log('All addresses have been processed successfully');
        };
      });
    });
});
