var MicroEvent = require('../../lib/microevent.js');
var appDispatcher=require('../../dispatcher/dispatcher.js');

var loanPurchaseZoneStore={
    loanObject:{
        isLogin:true,
        userBalance:100000,
        totalAmount:0,
        remainAmount:50000,
        yearRate:0.095,
        deadline:3,
        redPackageList:{"500":10,"1000":100,"10000":1000},
        purchaseAmount:"",
    },
    validationResult:{
        success:false,
        message:""
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
    },
    getValidationResult:function(){
        return this.validationResult;
    },
    validatePurchaseAmount:function(){
        var purchaseAmount=this.loanObject.purchaseAmount;
        var loanRemainAmount=this.loanObject.remainAmount;
        var userBalance=this.loanObject.userBalance;

        var validationResult={};
        if(userBalance < 100){
            validationResult={
                success:false,
                message:"您的账户余额不足，请及时充值！"
            }
        }else if(purchaseAmount === ""){//必须使用全等到，不然的话会将0强制转化为""
            validationResult={
                success:false,
                message:"输入金额不能为空！"
            }
        }else if(purchaseAmount === 0){
            validationResult={
                success:false,
                message:"输入金额不能为0！"
            }
        }else if(purchaseAmount <100){
            validationResult={
                success:false,
                message:"输入金额不能小于100！"
            }
        }else if(purchaseAmount % 100 !== 0){
            validationResult={
                success:false,
                message:"输入金额必须为100的整数倍！"
            }
        }else if(purchaseAmount > loanRemainAmount){
            validationResult={
                success:false,
                message:"输入金额不能大于项目可购买余额！"
            }
        }else if(purchaseAmount > userBalance) {
            validationResult={
                success:false,
                message:"购买金额不能大于账户余额,请及时充值！"
            }
        }else {
            validationResult={
                success:true,
                message:""
            }
        }

    this.validationResult=validationResult;
    },
    changePurchaseAmount:function(purchaseAmount){
        this.loanObject.purchaseAmount=purchaseAmount;
    }
};
MicroEvent.mixin(loanPurchaseZoneStore);


appDispatcher.register(function(payload){
    switch(payload.actionName){
        case "changePurchaseAmount":
            loanPurchaseZoneStore.changePurchaseAmount(payload.purchaseAmount);
            loanPurchaseZoneStore.validatePurchaseAmount();
            loanPurchaseZoneStore.trigger("change");
            break;
        case "recharge":
            if(!loanPurchaseZoneStore.getLoanObject().isLogin){
                loanPurchaseZoneStore.trigger("didNotLogin");
            }else {
                loanPurchaseZoneStore.trigger("goToRecharge");
            }
            break;
        case "submitForm":
            if(!loanPurchaseZoneStore.getLoanObject().isLogin){
                loanPurchaseZoneStore.trigger("didNotLogin");
            }else {
                loanPurchaseZoneStore.validatePurchaseAmount();
                if(loanPurchaseZoneStore.getValidationResult().success){
                    alert("我将会向后台发起提交数据的请求！")
                }else {
                    loanPurchaseZoneStore.trigger("change");
                }

            }
            break;
        default:
            //no op
    }
});

module.exports=loanPurchaseZoneStore;