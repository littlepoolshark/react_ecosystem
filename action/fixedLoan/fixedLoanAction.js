var appDispatcher=require("../../dispatcher/dispatcher.js");

var fixedLoanAction={
    getData:function(){
        appDispatcher.dispatch({
            actionName:"getData"
        })
    }
};

module.exports=fixedLoanAction;