//TODO: https://docs.gamedonia.com/guides/users
var superAgent = require('superagent'),
    Base64 = require('crypto-js/enc-base64'),
    Utf8 = require('crypto-js/enc-utf8');

function UserManager(core){
    this.core = core;
}

UserManager.prototype.constructor = UserManager;

UserManager.prototype.create = function(credentials, callback){
    //this.core.request('account/create', credentials, "POST", callback);
    var date = new Date().toUTCString();
    superAgent.post(this.core.apiURL + 'account/create')
        .set('X-Date', date)
        .set('X-Gamedonia-ApiKey', this.core.apiKey)
        .set('Content-type', "application/json")
        .set('X-Gamedonia-Signature', this.core.getSignature('account/create', credentials, "POST", "application/json", date))
        .send(JSON.stringify(credentials))
        .end(function(err, res){
            //if(err)throw new Error(err);

            if(callback && typeof callback === "function")callback(res);
        });
    return this;
};

UserManager.prototype.loginWithEmail = function(email, password, callback){
    var utf = Utf8.parse("mail|"+email+"|"+password);
    var base64 = Base64.stringify(utf);
    var date = new Date().toUTCString();

    superAgent.post(this.core.apiURL + 'account/login')
        .set('X-Date', date)
        .set('X-Gamedonia-ApiKey', this.core.apiKey)
        .set('Content-type', "application/json")
        .set('Authorization', "Basic " + base64)
        .set('X-Gamedonia-Signature', this.core.getSignature('account/login', "", "POST", "application/json", date))
        .send(JSON.stringify(""))
        .end(function(err, res){
            //if(err)throw new Error(err);

            if(callback && typeof callback === "function")callback(res);
        });
};

UserManager.prototype.loginWithSessionToken = function(callback){

};

UserManager.prototype.loginWithFacebook = function(fbUID, fbToken, callback){

};

UserManager.prototype.logout = function(callback){

};

UserManager.prototype.getUser = function(id, callback){

};

UserManager.prototype.updateUser = function(profile, callback){

};

UserManager.prototype.changePassword = function(mail, currentPassword, newPassword, callback){

};


module.exports = UserManager;
