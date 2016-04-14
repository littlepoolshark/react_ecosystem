var MicroEvent = require('../../lib/microevent.js');

var loanPurchaseZoneStore={
    setIsLogin:function(isLogin){
        this.isLogin=isLogin || false;
    },
    getIsLogin:function(){
        return this.isLogin;
    },
    setUserBalance:function(userBalance){
        this.userBalance=userBalance || 0;
    },
    getUserBalance:function(){
        return this.userBalance;
    },
    setLoanObject:function(loanObject){
        this.loanObject={};
        for(var key in loanObject){
            this.loanObject[key]=loanObject[key];
        }
    },
    getLoanObject:function() {
        return this.loanObject;
    },
    setLoanRemainAmount:function(){
        this.loanRemainAmount=20000;
    },
    getLoanRemainAmount:function(){
        return this.loanRemainAmount;
    },
    figureOutUsableAmount:function(userBalance,loanRemainAmount){
        var userBalance=parseInt(userBalance),
            loanRemainAmount=parseInt(loanRemainAmount);
        var UsableAmount=userBalance >= loanRemainAmount ?
            loanRemainAmount :
            userBalance ;
        return UsableAmount;
    }
};

MicroEvent.mixin(loanPurchaseZoneStore);

module.exports=loanPurchaseZoneStore;