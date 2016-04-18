var MicroEvent = require('../../lib/microevent.js');

var loanPurchaseZoneStore={
    setIsLogin:function(isLogin){
        this.isLogin=isLogin;
    },
    getIsLogin:function(){
        return this.isLogin || true;
    },

    setUserBalance:function(userBalance){
        this.userBalance=userBalance;
    },
    getUserBalance:function(){
        return this.userBalance || 10000;
    },

    setLoanObject:function(loanObject){
        this.loanObject={};
        for(var key in loanObject){
            this.loanObject[key]=loanObject[key];
        }
    },
    getLoanObject:function() {
        return this.loanObject ||{
                "yearRate":0.095,
                "deadline":1,
                "deadlineUnit":"个月",
                "remainAmount":20000,
                "totalAmount":100000,
                "redPackageList":{"500":10,"1000":100,"10000":1000},
                "pushTime":1460291448820
            };
    },

    setLoanRemainAmount:function(){
        this.loanRemainAmount=20000;
    },
    getLoanRemainAmount:function(){
        return this.loanRemainAmount;
    },

    setValidationResult:function(validationResult){
        this.validationResult= validationResult;
    },
    getValidationResult:function(){
        return this.validationResult || {success:true,message:""} ;
    },

    setPurchaseAmount:function(purchaseAmount){
        this.purchaseAmount=purchaseAmount === '' ? '' : parseFloat(purchaseAmount) ;
    },
    getPurchaseAmount:function(){
        return this.purchaseAmount === 0 ? 0 : (this.purchaseAmount || '') ;
    },

    setExpectReturnAmount:function(expectReturnAmount){
        this.expectReturnAmount=expectReturnAmount;
    },
    getExpectReturnAmount:function(){
        return this.expectReturnAmount || 0.00;
    },

    setRedPackageAmount:function(redPackageAmount){
        this.redPackageAmount=redPackageAmount;
    },
    getRedPackageAmount:function(){
        return this.redPackageAmount || 0;
    },

    setActualPayment:function(actualPayment){
        this.actualPayment=actualPayment;
    },
    getActualPayment:function(){
        return this.actualPayment || 0 ;
    },

    figureOutUsableAmount:function(){
        var userBalance=parseInt(this.getUserBalance()),
            loanRemainAmount=parseInt(this.getLoanRemainAmount());
        var UsableAmount=userBalance >= loanRemainAmount ?
            loanRemainAmount :
            userBalance ;
        return UsableAmount;
    },
    checkoutPurchaseAmount:function(){
        var purchaseAmount=this.getPurchaseAmount();
        var loanRemainAmount=this.getLoanObject();
        var userBalance=this.getUserBalance;

        var validation={};
        if(userBalance < 100){
            validation={
                success:false,
                message:"您的账户余额不足，请及时充值！"
            }
        }else if(purchaseAmount === ""){//必须使用全等到，不然的话会将0强制转化为""
            validation={
                success:false,
                message:"输入金额不能为空！"
            }
        }else if(purchaseAmount === 0){
            validation={
                success:false,
                message:"输入金额不能为0！"
            }
        }else if(purchaseAmount <100){
            validation={
                success:false,
                message:"输入金额不能小于100！"
            }
        }else if(purchaseAmount % 100 !== 0){
            validation={
                success:false,
                message:"输入金额必须为100的整数倍！"
            }
        }else if(purchaseAmount > loanRemainAmount){
            validation={
                success:false,
                message:"输入金额不能大于项目可购买余额！"
            }
        }else if(purchaseAmount > userBalance) {
            validation={
                success:false,
                message:"购买金额不能大于账户余额,请及时充值！"
            }
        }else {
            validation={
                success:true,
                message:""
            }
        }

    this.setValidationResult(validation);
    },
    FigureOutExpectedReturnAmount:function(){
        var purchaseAmount=this.getPurchaseAmount();
        var loanYearRate=0.095;
        var loanDeadline=3;
        var expectedReturn= purchaseAmount === "" ? 0.00 : ((purchaseAmount * loanYearRate)/12 * loanDeadline).toFixed(2);
        this.setExpectReturnAmount(expectedReturn);
    },
    matchRedPackage:function(){
        var redPackageAmount=0;
        var redPackageList=this.getLoanObject().redPackageList;
        var purchaseAmount=this.getPurchaseAmount();
        //debugger;
        for(var key in redPackageList){
            if(parseInt(purchaseAmount) === parseInt(key)) {
                redPackageAmount=redPackageList[key];
                break;
            }
        }
        this.setRedPackageAmount(redPackageAmount);
    },
    FigureOutActualPayment:function(){
        var actualPayment=(this.getPurchaseAmount()-this.getRedPackageAmount()).toFixed(0);
        this.setActualPayment(actualPayment);
    }
};

MicroEvent.mixin(loanPurchaseZoneStore);

module.exports=loanPurchaseZoneStore;