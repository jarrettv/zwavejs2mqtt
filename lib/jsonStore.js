'use strict'

var jsonfile = require('jsonfile'),
reqlib = require('app-root-path').require,
storeDir = reqlib('config/app.js').storeDir,
Promise = require('bluebird'),
debug = require('debug')('z2m:Store'),
utils = reqlib('lib/utils.js');

debug.color = 3;

function getFile(config){
  return new Promise((resolve, reject) => {
    jsonfile.readFile(utils.joinPath(utils.getPath(true), storeDir, config.file), function(err, data) {
      if(err && err.code != 'ENOENT'){
          reject(err);
      }else{
        if(err && err.code == 'ENOENT')
          debug(config.file, "not found");

        resolve({file: config.file, data: data || config.default})
      }
    });
  });
}

/**
Constructor
**/
function StorageHelper(){
  this.store = {};
}

StorageHelper.prototype.init = function(config){
  return new Promise((resolve, reject) => {
    storage_helper.config = config;
    Promise.map(Object.keys(config), function(model) {
      return getFile(config[model]);
    }).then(results => {
      for(var i=0;i<results.length;i++){
        storage_helper.store[results[i].file] = results[i].data;
      }
      resolve(storage_helper.store)
    })
    .catch(err => reject(err));
  })
};

StorageHelper.prototype.get = function(model){
  if(storage_helper.store[model.file])
    return storage_helper.store[model.file];
  else
    throw Error ('Requested file not present in store: ' + model.file);
};

StorageHelper.prototype.put = function(model, data){
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(utils.joinPath(utils.getPath(true), storeDir, model.file), data, function (err) {
      if(err){
        reject(err);
      }else {
        storage_helper.store[model.file] = data;
        resolve(storage_helper.store[model.file]);
      }
    })
  });
};

var storage_helper = module.exports = exports = new StorageHelper;