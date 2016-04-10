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
    useAllBalance:function(id){
        appDispatcher.dispatch({
            actionName:"loanPurchaseZone.useAllBalance",
        })
    }
};

module.exports=loanPurchaseZoneAction;