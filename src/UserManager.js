//TODO: https://docs.gamedonia.com/guides/users

function UserManager(core){
    this.core = core;
}

UserManager.prototype.constructor = UserManager;

UserManager.prototype.create = function(credentials, callback){

};

UserManager.prototype.loginWithEmail = function(email, password, callback){

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
