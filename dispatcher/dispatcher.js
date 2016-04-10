var Dispatcher = require('flux').Dispatcher;
var appDispatcher = new Dispatcher();
var $=require("jquery");
var investmentListStore = require('../store/index/investmentListStore.js');
var lonaPurchaseZoneStore=require('../store/fixedLoan/loanPurchaseZone');

appDispatcher.register( function( payload ) {
    switch( payload.actionName ) {

        //index ==> investmentList
        case 'investmentList.getData':
            $.ajax({
                url:"/mock/investmentList.json",
                type:"get",
                dataType:"json",
                success:function(rs){
                    investmentListStore.setAll(rs.data);
                    investmentListStore.trigger("change");
                }
            })
            break;
        case 'investmentList.deleteItem':
            investmentListStore.deleteItem(payload.id);
            investmentListStore.trigger("change");
            break;

        //fixedLoan ==> loanPurchaseZone
        case 'loanPurchaseZone.getData':
            $.ajax({
                url:"/mock/loanPurchaseZone.json",
                type:"get",
                dataType:"json",
                success:function(rs){
                    lonaPurchaseZoneStore.setIsLogin(rs.data);
                    lonaPurchaseZoneStore.setUserBalance(rs.data);
                    lonaPurchaseZoneStore.setLoanObject(rs.data);
                    lonaPurchaseZoneStore.trigger("change");
                }
            })
        default :
            break;
    }
    return true; // Needed for Flux promise resolution
});

module.exports = appDispatcher;
