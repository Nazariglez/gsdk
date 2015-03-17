var superAgent = require('superagent'),
    UserManager = require('./UserManager'),
    DataManager = require('./DataManager'),
    MD5 = require('crypto-js/md5'),
    HmacSHA1= require('crypto-js/hmac-sha1');

var API_URL = "http://prepro.gamedonia.com",
    API_VERSION = "v1";

function Gamedonia(gameSecret, apiKey, url, version){
    url = url || API_URL;
    version = (version || API_VERSION) + "/";
    this.apiURL = url + '/' + version;
    this.gameSecret = gameSecret;
    this.apiKey = apiKey;

    this.userManager = new UserManager(this);
    this.dataManager = new DataManager(this);
}

Gamedonia.prototype.constructor = Gamedonia;

Gamedonia.prototype.ajax = function(url, data, method, headers, callback){

};

module.exports = Gamedonia;