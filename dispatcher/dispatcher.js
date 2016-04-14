var Dispatcher = require('flux').Dispatcher;
var appDispatcher = new Dispatcher();
var $=require("jquery");
var investmentListStore = require('../store/index/investmentListStore.js');
var loanPurchaseZoneStore=require('../store/fixedLoan/loanPurchaseZoneStore.js');

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
                    loanPurchaseZoneStore.setIsLogin(rs.isLogin);
                    loanPurchaseZoneStore.setUserBalance(rs.userBalance);
                    loanPurchaseZoneStore.setLoanObject(rs.loanObject);
                    loanPurchaseZoneStore.trigger("change");
                }
            });
            break;
        case 'loanPurchaseZone.useAllBalance':
            var userBalance,loanRemainAmount,purchaseAmount;
            if(loanPurchaseZoneStore.getIsLogin() !== true){
                loanPurchaseZoneStore.trigger("didNotLogin");
            }else {
                userBalance=loanPurchaseZoneStore.getUserBalance();
                loanRemainAmount=loanPurchaseZoneStore.getLoanRemainAmount();
                purchaseAmount=loanPurchaseZoneStore.figureOutUsableAmount(userBalance,loanRemainAmount);
                loanPurchaseZoneStore.trigger("purchaseAmountChange",purchaseAmount);
            }
            break;
        default :
            break;
    }
    return true; // Needed for Flux promise resolution
});

module.exports = appDispatcher;
