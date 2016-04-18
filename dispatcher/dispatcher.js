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
            if(loanPurchaseZoneStore.getIsLogin() !== true){
                loanPurchaseZoneStore.trigger("didNotLogin");
            }else {
                var purchaseAmount=loanPurchaseZoneStore.figureOutUsableAmount();
                loanPurchaseZoneStore.setPurchaseAmount(purchaseAmount);
                loanPurchaseZoneStore.checkoutPurchaseAmount();
                loanPurchaseZoneStore.FigureOutExpectedReturnAmount();
                loanPurchaseZoneStore.matchRedPackage();
                loanPurchaseZoneStore.FigureOutActualPayment();
                loanPurchaseZoneStore.trigger("purchaseAmountChange");
            }
            break;
        case 'recharge':
            if(loanPurchaseZoneStore.getIsLogin() !== true){
                loanPurchaseZoneStore.trigger("didNotLogin");
            }else {
               loanPurchaseZoneStore.trigger("goToRecharge");
            }
            break;
        case 'loanPurchaseZone.fillInPurchaseAmount':
            loanPurchaseZoneStore.setPurchaseAmount(payload.purchaseAmount);
            loanPurchaseZoneStore.checkoutPurchaseAmount();
            loanPurchaseZoneStore.FigureOutExpectedReturnAmount();
            loanPurchaseZoneStore.matchRedPackage();
            loanPurchaseZoneStore.FigureOutActualPayment();
            loanPurchaseZoneStore.trigger("purchaseAmountChange");
            break;
        default :
            break;
    }
    return true; // Needed for Flux promise resolution
});

module.exports = appDispatcher;
