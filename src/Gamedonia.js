var superAgent = require('superagent'),
    UserManager = require('./UserManager'),
    DataManager = require('./DataManager'),
    cryptoHex = require('crypto-js').enc.Hex,
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

Gamedonia.prototype.request = function(url, data, method, callback){
    var date = new Date().toUTCString(),
        contentType = "application/json";

    var request;
    switch(method){
        case "POST":
            request = superAgent.post(this.apiURL + url);
            break;
        case "GET":
            request = superAgent.get(this.apiURL + url);
            break;
        case "PUT":
            request = superAgent.put(this.apiURL + url);
            break;
        case "DELETE":
            request = superAgent.del(this.apiURL + url);
            break;
    }

    request.data(data)
        .set('X-Date', date)
        .set('X-Gamedonia-ApiKey', this.apiKey)
        .set('Content-type', contentType)
        .set('X-Gamedonia-Signature', this._getSignature(url, data, method, contentType, date))
        .send(data)
        .end(callback);
};

Gamedonia.prototype._getSignature = function(url, data, method, contentType, date){
    if(method === "POST" || method === "PUT"){
        return sign(this.gameSecret, JSON.stringify(data), contentType, date, method, url);
    }else{
        return signGetOrDelete(this.gameSecret, date, method, url);
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