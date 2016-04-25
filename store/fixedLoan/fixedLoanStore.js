var MicroEvent = require('../../lib/microevent.js');
var appDispatcher=require('../../dispatcher/dispatcher.js');
var loanPurchaseZoneStore=require("./loanPurchaseZoneStore.js");
var $=require("jquery");

var fixedLoanStore={
    loanObject:{
        isLogin:false,
        userBalance:0,
        title:"",
        totalAmount:0,
        remainAmount:0,
        yearRate:0,
        deadline:0,
        redPackageList:{},
        publishTime:0,
        purchaseAmount:"",
    },
    getLoanObject:function(){
        return this.loanObject;
    },
    setLoanObject:function(loanObject){
        for(var key in loanObject){
            if(key in this.loanObject === true){
                this.loanObject[key]=loanObject[key];
            }
        }
    }
};
MicroEvent.mixin(fixedLoanStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "getData":
            $.ajax({
                url:"/mock/loanPurchaseZone.json?timestamp="+ new Date().getTime(),
                type:"get",
                dataType:"json",
                success:function(rs){
                    rs.loanObject.isLogin=rs.isLogin;
                    rs.loanObject.userBalance=rs.userBalance;
                    fixedLoanStore.setLoanObject(rs.loanObject);
                    fixedLoanStore.trigger("fixedLoan_change");

                    loanPurchaseZoneStore.setLoanObject(rs.loanObject);
                    loanPurchaseZoneStore.trigger("change");
                }
            })

            break;
        default:
            break;
        //no op
    }
});

module.exports=fixedLoanStore;