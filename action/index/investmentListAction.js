var appDispatcher=require("../../dispatcher/dispatcher.js");

var investmentListAction={
    getData:function(){
        appDispatcher.dispatch({
            actionName:"investmentList.getData"
        })
    },
    deleteItem:function(id){
        appDispatcher.dispatch({
            actionName:"investmentList.deleteItem",
            id:id
        })
    }
};

module.exports=investmentListAction;