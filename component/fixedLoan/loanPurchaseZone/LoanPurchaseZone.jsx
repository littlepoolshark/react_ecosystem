require("./LoanPurchaseZone.css");

var React=require("react");
var classNames=require("classnames");
var loanPurchaseZoneStore=require("../../../store/fixedLoan/loanPurchaseZoneStore.js");
var loanPurchaseZoneAction=require("../../../action/fixedLoan/loanPurchaseZoneAction.js");

//用户可用余额
var UserUsableBalance=React.createClass({
    render:function(){
        var loanObject=this.props.loanObject;
        return (
            <div>
                <label className="loan-purchaseZone-subtitle">账户可用余额：</label>
                <span className="amount">{loanObject.userBalance}</span>
            </div>
        )
    }
});

//余额全部购买
var UsingAllBalanceButton=React.createClass({
    _figureOutUsableAmount:function(loanRemainAmount,userBalance){
        var loanRemainAmount=parseInt(loanRemainAmount);
        var userBalance=parseInt(userBalance);

        return loanRemainAmount >= userBalance ? userBalance : loanRemainAmount ;
    },
    _handleClick:function(){
        var loanObject=this.props.loanObject;
        var purchaseAmount=this._figureOutUsableAmount(loanObject.remainAmount,loanObject.userBalance);
        loanPurchaseZoneAction.changePurchaseAmount(purchaseAmount);//发出一个action
    },
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-left" onClick={this._handleClick}>余额全部购买</a>
        )
    }
});

//充值
var RechargeButton=React.createClass({
    _handleClick:function(){
        loanPurchaseZoneAction.recharge();
    },
    render:function(){
        return (
            <a href="javascript:void(0)" className="pull-right" onClick={this._handleClick}>充值 》</a>
        )
    }
});

//接收用户所输入的购买金额
var GetPurchaseAmount=React.createClass({
    _handlePurchaseAmountChange:function(){
        var purchaseAmount_str=this.refs.purchaseAmount.value;
        loanPurchaseZoneAction.changePurchaseAmount(purchaseAmount_str);
    },
    render:function(){
        var loanObject=this.props.loanObject;
        return (
            <div style={{marginBottom:"0"}}>
                <input type="text"
                       className="nt-input block"
                       value={loanObject.purchaseAmount}
                       placeholder="100元起投，100的整数倍追加"
                       onChange={this._handlePurchaseAmountChange}
                       ref="purchaseAmount"
                />
            </div>
        )
    }
});

//对用户所输入的金额进行验证
var CheckPurchaseAmount=React.createClass({
    render:function(){
        var validationResult=this.props.validationResult;
        var classes=classNames({
            "loan-purchaseZone-errorMessage":true,
            "invisible":validationResult.success
        });

        return (
            <p className={classes} style={{marginBottom:"20px"}}>
                {validationResult.message}
            </p>
        )
    }

});

//计算预期收益
var FigureOutExpectedReturn=React.createClass({
    _figureOutExpectedReturn:function(purchaseAmount,yearRate,deadline){
        var expectedReturn=0.00;
        if(purchaseAmount !== ""){
            expectedReturn=((purchaseAmount * yearRate / 12) * deadline).toFixed(2);
        }

        return expectedReturn;
    },
    render:function(){
        var purchaseAmount=this.props.loanObject.purchaseAmount;
        var yearRate=this.props.loanObject.yearRate;
        var deadline=this.props.loanObject.deadline;

        return (
            <div style={{marginTop:"10px"}}>
                <label className="loan-purchaseZone-subtitle">预期收益：</label>
                <span className="amount">{this._figureOutExpectedReturn(purchaseAmount,yearRate,deadline)}</span>元
            </div>
        )
    }
});


//匹配红包并且计算出实际的支付金额
var FigureOutActualPayment=React.createClass({
    _figureOutRedPackageAmount:function(redPackageList,purchaseAmount){
        var redPackageAmount=0;
        for(var key in redPackageList){
           if(parseInt(key) === purchaseAmount) {
               redPackageAmount=redPackageList[key];
               break;
           }
        }

        return redPackageAmount;
    },
    _figureOutActualPayment:function(redPackageAmount,purchaseAmount){
        var actualPayment=(purchaseAmount - redPackageAmount).toFixed(2);

        return actualPayment;
    },
    render:function(){
        var loanObject=this.props.loanObject;
        var redPackageAmount=this._figureOutRedPackageAmount(loanObject.redPackageList,loanObject.purchaseAmount);
        var actualPayment=this._figureOutActualPayment(redPackageAmount,loanObject.purchaseAmount);
        var classes=classNames({
            "clearfix":true,
            "hide": redPackageAmount ? false : true
        });

        return (
            <div className={classes}>
                <label  className="loan-purchaseZone-subtitle pull-left">使用<span className="amount">{redPackageAmount}</span>元红包</label>
                <label  className="loan-purchaseZone-subtitle pull-right">支付金额：<span className="amount">{actualPayment}</span>元</label>
            </div>
        )
    }
});

//购买
var PurchaseButton=React.createClass({
    _handleClick:function(){
       loanPurchaseZoneAction.submitForm();
    },
    render:function(){
        var buttonText=this.props.loanObject.isLogin ? "立即抢购" : "登录抢购" ;

        return (
            <div>
                <button className="nt-button block default" onClick={this._handleClick}>{buttonText}</button>
            </div>
        )
    }
});




//controller view
var LoanPurchaseZone=React.createClass({
    _getPurchaseZoneState:function(){
        return {
            loanObject:loanPurchaseZoneStore.getLoanObject(),
            validationResult:loanPurchaseZoneStore.getValidationResult()
        }
    },
    getInitialState:function(){
        return this._getPurchaseZoneState();
    },
    _handleChange:function(purchaseAmount){
        this.setState(this._getPurchaseZoneState());
    },
    render:function(){
        var loanObject=this.state.loanObject;
        var validationResult=this.state.validationResult;

        return (
            <div className="loan-purchaseZone">
                <UserUsableBalance  loanObject={loanObject}/>
                <div className="clearfix loan-purchaseAll-and-recharge">
                    <UsingAllBalanceButton loanObject={loanObject}/>
                    <RechargeButton  loanObject={loanObject} />
                </div>
                <GetPurchaseAmount  loanObject={loanObject} />
                <CheckPurchaseAmount  validationResult={validationResult}/>
                <FigureOutExpectedReturn  loanObject={loanObject} />
                <FigureOutActualPayment loanObject={loanObject} />
                <PurchaseButton  validationResult={validationResult} loanObject={loanObject} />
            </div>
        )
    },
    componentDidMount:function(){
        loanPurchaseZoneStore.bind("change",function(){
            console.log("into loanPurchaseZoneStore change callback")
            this._handleChange();
        }.bind(this));

        loanPurchaseZoneStore.bind("didNotLogin",function(){
            alert("您没有登录，请先登录!");
        });

        loanPurchaseZoneStore.bind("goToRecharge",function(){
            alert("it is the time to go to recharge page!");
        });

    }
});

module.exports=LoanPurchaseZone;