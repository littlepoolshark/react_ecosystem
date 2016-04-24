var appDispatcher=require("../../dispatcher/dispatcher.js");

var loanPurchaseZoneAction={
    getData:function(){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.getData"
        })
    },
    recharge:function(){
        appDispatcher.dispatch({
            actionName:"recharge"//这里就不使用命名空间了。因为充值这个action并不是只有在loanPurchaseZone才有
        })
    },
    changePurchaseAmount:function(purchaseAmount){
        appDispatcher.dispatch({
            actionName:"changePurchaseAmount",
            purchaseAmount:isNaN(parseInt(purchaseAmount)) ? "" : parseInt(purchaseAmount)
        })
    },
    submitForm:function(){
        appDispatcher.dispatch({
            actionName:"submitForm"
        })
    }
};

module.exports=loanPurchaseZoneAction;