var appDispatcher=require("../../dispatcher/dispatcher.js");

var loanPurchaseZoneAction={
    getData:function(){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.getData"
        })
    },
    checkPurchaseAmount:function(){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.checkPurchaseAmount"
        })
    },
    useAllBalance:function(){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.useAllBalance"
        })
    },
    recharge:function(){
        appDispatcher.dispatch({
            actionName:"recharge"//这里就不使用命名空间了。因为充值这个action并不是只有在loanPurchaseZone才有
        })
    },
    fillInPurchaseAmount:function(purchaseAmount){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.fillInPurchaseAmount",
            purchaseAmount:purchaseAmount
        })
    }
};

module.exports=loanPurchaseZoneAction;