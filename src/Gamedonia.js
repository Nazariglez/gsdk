var superAgent = require('superagent'),
    UserManager = require('./UserManager'),
    DataManager = require('./DataManager'),
    cryptoHex = require('crypto-js/enc-hex'),
    MD5 = require('crypto-js/md5'),
    HmacSHA1= require('crypto-js/hmac-sha1');

var API_URL = "http://api.gamedonia.com",
    API_VERSION = "v1";

function Gamedonia(gameSecret, apiKey, url, version){
    url = url || API_URL;
    this.version = "/" + (version || API_VERSION) + "/";
    this.apiURL = url + this.version;
    this.gameSecret = gameSecret;
    this.apiKey = apiKey;

    this.userManager = new UserManager(this);
    this.dataManager = new DataManager(this);
}

Gamedonia.prototype.constructor = Gamedonia;

Gamedonia.prototype.getSignature = function(url, data, method, contentType, date){
    var path = this.version + url;
    if(method === "POST" || method === "PUT"){
        return sign(this.gameSecret, JSON.stringify(data), contentType, date, method, path);
    }else{
        return signGetOrDelete(this.gameSecret, date, method, path);
    }
};

module.exports = Gamedonia;

function sign(secret,data,contentType,date,requestMethod, path){
    var contentMd5 = MD5(data).toString(cryptoHex);
    var toSign = requestMethod + "\n" + contentMd5 + "\n" + contentType + "\n" + date + "\n" + path;
    var calculatedSignature = HmacSHA1(toSign,secret);
    return calculatedSignature.toString(cryptoHex);
}
function signGetOrDelete(secret,date,requestMethod, path){
    var toSign = requestMethod + "\n" + date + "\n" + path;
    var calculatedSignature = HmacSHA1(toSign,secret);
    return calculatedSignature.toString(cryptoHex);
}